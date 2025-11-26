import {
	Component,
	DestroyRef,
	inject,
	input,
	OnDestroy,
	OnInit,
} from "@angular/core";
import {QuillModule} from "ngx-quill";
import {IArticle} from "../../../shared/entities/IArticle";
import {ArticleService} from "../../../shared/services/article.service";
import {Router} from "@angular/router";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {IAttachment} from "../../../shared/entities/IAttachment";
import {AttachmentsBlockComponent} from "../../molecules/attachments-block/attachments-block.component";
import {SocketService} from "../../../shared/services/ws.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AlertService} from "../../../shared/services/alert.service";
import {ButtonComponent} from "../../atoms/button/button.component";
import {UploadButtonComponent} from "../../atoms/upload-button/upload-button.component";
import {InputComponent} from "../../atoms/input/input.component";

enum EArticleMode {
	PREVIEW,
	EDIT,
}

@Component({
	selector: "app-article-page",
	imports: [
		QuillModule,
		ButtonComponent,
		ReactiveFormsModule,
		AttachmentsBlockComponent,
		UploadButtonComponent,
		InputComponent,
	],
	templateUrl: "./article-page.component.html",
	styleUrl: "./article-page.component.scss",
})
export class ArticlePageComponent implements OnInit, OnDestroy {
	private _router: Router = inject(Router);
	private _articleService = inject(ArticleService);
	private _socketService = inject(SocketService);
	private _sanitizer = inject(DomSanitizer);
	private _destroyRef = inject(DestroyRef);
	private _alertService = inject(AlertService);

	protected readonly MODE = EArticleMode;
	protected articleForm = new FormGroup({
		id: new FormControl<string | null>(null),
		title: new FormControl<string>("", [
			Validators.required,
			Validators.maxLength(40),
			Validators.minLength(3),
		]),
		content: new FormControl<string>("", [
			Validators.required,
			Validators.minLength(20),
		]),
		attachments: new FormControl<IAttachment[]>([]),
	});

	public articleId = input.required<string>();
	public currentMode = EArticleMode.PREVIEW;
	public savedArticleForm: IArticle | null = null;

	public ngOnInit(): void {
		this.articleForm.controls.id.setValue(this.articleId());

		if (this.articleId()) {
			this._socketService.joinRoom(this.articleId()!);

			this._socketService
				.listen<IArticle>("articleUpdated")
				.pipe(takeUntilDestroyed(this._destroyRef))
				.subscribe(update => {
					this.articleForm.patchValue(update);
					this._alertService.show({
						message: "This article was updated!",
						type: "info",
						timeout: 5000,
					});
				});
			this._articleService
				.getArticleById(this.articleId()!)
				.pipe(takeUntilDestroyed(this._destroyRef))
				.subscribe({
					next: data => {
						this.articleForm.patchValue(data);
					},
				});
		}
	}

	public ngOnDestroy() {
		this._socketService.leaveRoom(this.articleId()!);
	}

	get safeHtml(): SafeHtml {
		if (!this.articleForm.controls.content.value) {
			return "";
		}

		return this._sanitizer.bypassSecurityTrustHtml(
			this.articleForm.controls.content.value.replace(
				/<(h1|h2|h3|li|ul|ol|p)><\/\1>/g,
				"<p><br></p>"
			)
		);
	}

	public toggleMode() {
		if (this.currentMode == EArticleMode.PREVIEW) {
			this.currentMode = EArticleMode.EDIT;

			this.savedArticleForm = structuredClone(
				this.articleForm.value as IArticle
			);
		} else {
			this.currentMode = EArticleMode.PREVIEW;
			this.articleForm.markAsUntouched();

			if (this.savedArticleForm) {
				this.articleForm.patchValue(this.savedArticleForm);
			}
		}
	}

	public saveArticle() {
		if (!this.articleForm.valid) return;

		this._articleService
			.updateArticle(this.articleForm.value as IArticle)
			.subscribe({
				next: () => {
					this._alertService.show({
						message: "Article was saved!",
						type: "success",
						timeout: 5000,
					});
				},
				error: err => {
					this._alertService.show({
						message: err.error.error,
						type: "error",
						timeout: 5000,
					});
				},
			});
		this.currentMode = this.MODE.PREVIEW;
	}

	public deleteArticle() {
		this._articleService.deleteArticle(this.articleId()!).subscribe({
			next: () => {
				this._alertService.show({
					message: "Article was deleted!",
					type: "success",
					timeout: 5000,
				});
				this._router.navigate(["/"]);
			},
			error: err => {
				this._alertService.show({
					message: err.error.error,
					type: "error",
					timeout: 5000,
				});
			},
		});
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
				this._alertService.show({
					message: "Attachment was uploaded!",
					type: "success",
					timeout: 5000,
				});
				this.articleForm.markAsTouched()
				input.value = "";
			},
			error: err => {
				this._alertService.show({
					message: err.error.error,
					type: "error",
					timeout: 5000,
				});
				input.value = "";
			},
		});
	}
}
