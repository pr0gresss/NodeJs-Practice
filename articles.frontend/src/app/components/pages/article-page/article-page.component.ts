import {Component, inject, OnDestroy, OnInit, signal} from "@angular/core";
import {QuillModule} from "ngx-quill";
import {IArticle} from "../../../shared/entities/IArticle";
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {IAttachment} from "../../../shared/entities/IAttachment";
import {AttachmentsBlockComponent} from "../../molecules/attachments-block/attachments-block.component";
import {SocketService} from "../../../shared/services/ws.service";
import {Subscription} from "rxjs";

enum EArticleMode {
	PREVIEW,
	EDIT,
}

@Component({
	selector: "app-article-page",
	imports: [QuillModule, ReactiveFormsModule, AttachmentsBlockComponent],
	templateUrl: "./article-page.component.html",
	styleUrl: "./article-page.component.scss",
})
export class ArticlePageComponent implements OnInit, OnDestroy {
	private _router: Router = inject(Router);
	private _articleService = inject(ArticleService);
	private _socketService = inject(SocketService);
	private sanitizer = inject(DomSanitizer);
	private _route = inject(ActivatedRoute);
	private articleId = signal<string | null>(null);
	private subs: Subscription[] = [];

	protected readonly MODE = EArticleMode;
	protected articleForm = new FormGroup({
		id: new FormControl<string | null>(this.articleId()),
		title: new FormControl<string>(""),
		content: new FormControl<string>(""),
		attachments: new FormControl<IAttachment[]>([]),
	});

	public currentMode = EArticleMode.PREVIEW;

	public ngOnInit(): void {
		this.articleId.set(this._route.snapshot.paramMap.get("id"));

		if (this.articleId()) {
			this._socketService.joinArticleRoom(this.articleId()!);

			this._socketService
				.listen<IArticle>("articleUpdated")
				.subscribe(update => {
					console.log("🔄 Article updated via socket:", update);
					alert("This article was updated!");
				});
			this._articleService.getArticleById(this.articleId()!).subscribe({
				next: data => {
					this.articleForm.patchValue(data);
				},
			});
		}
	}

	public ngOnDestroy() {
		this.subs.forEach(s => s.unsubscribe());
	}

	get safeHtml(): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(
			this.articleForm.controls.content.value || ""
		);
	}

	public toggleMode() {
		console.log(this.articleForm.touched);
		if (this.currentMode == EArticleMode.PREVIEW) {
			this.currentMode = EArticleMode.EDIT;
		} else {
			this.currentMode = EArticleMode.PREVIEW;
			this._articleService.getArticleById(this.articleId()!).subscribe({
				next: data => {
					this.articleForm.patchValue(data);
					this.articleForm.markAsUntouched();
				},
			});
		}
	}

	public saveArticle() {
		this._articleService
			.updateArticle(this.articleForm.value as IArticle)
			.subscribe();
		this.currentMode = this.MODE.PREVIEW;
	}

	public deleteArticle() {
		this._articleService.deleteArticle(this.articleId()!).subscribe();
		this._router.navigate(["/"]);
	}

	public handleFileSelection(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const file = input.files[0];

		this._articleService.uploadAttachment(file).subscribe({
			next: attachment => {
				const current = this.articleForm.controls.attachments.value || [];
				this.articleForm.controls.attachments.setValue([
					...current,
					attachment,
				]);
				input.value = "";
				console.log(this.articleForm.controls.attachments.value);
			},
			error: err => {
				alert(err);
				input.value = "";
			},
		});
	}
}
