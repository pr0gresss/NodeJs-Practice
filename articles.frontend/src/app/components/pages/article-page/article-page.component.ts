import {
	Component,
	computed,
	DestroyRef,
	inject,
	input,
	OnDestroy,
	OnInit,
	signal,
} from "@angular/core";
import {QuillModule} from "ngx-quill";
import {IArticle} from "../../../shared/entities/IArticle";
import {ArticleService} from "../../../shared/services/article.service";
import {Router, RouterLink} from "@angular/router";
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
import {WysiwygInputComponent} from "../../atoms/wysiwyg-input/wysiwyg-input.component";
import {CommentsFormComponent} from "../../organisms/comments-form/comments-form.component";
import {IVersion} from "../../../shared/entities/IVersion";
import {UserCardComponent} from "../../molecules/user-card/user-card.component";
import {UserService} from "../../../shared/services/user.service";
import {IUser} from "../../../shared/entities/IUser";

enum EArticleMode {
	PREVIEW,
	EDIT,
}

@Component({
	selector: "app-article-page",
	imports: [
		ButtonComponent,
		ReactiveFormsModule,
		AttachmentsBlockComponent,
		UploadButtonComponent,
		InputComponent,
		WysiwygInputComponent,
		CommentsFormComponent,
		RouterLink,
		UserCardComponent,
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
	private _userService = inject(UserService);

	protected readonly MODE = EArticleMode;
	protected versionForm = new FormGroup({
		articleId: new FormControl<string | null>(null),
		authorId: new FormControl<string>(""),
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
	public user = signal<IUser | null>(null);
	public currentMode = EArticleMode.PREVIEW;
	public savedVersionForm: IVersion | null = null;

	public ngOnInit(): void {
		this.versionForm.controls.articleId.setValue(this.articleId());

		this._socketService.joinRoom(this.articleId());

		this._socketService
			.listen<IVersion>("articleUpdated")
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((newVersion: IVersion) => {
				this.versionForm.patchValue(newVersion);
				this._alertService.show({
					message: "This article was updated!",
					type: "info",
					timeout: 5000,
				});
			});
		this._articleService
			.getArticleById(this.articleId())
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe({
				next: data => {
					this.versionForm.patchValue(data.versions[0]);

					this._userService.getUserById(data.versions[0].authorId!).subscribe({
						next: data => {
							this.user.set(data);
						},
					});
				},
			});
	}

	public ngOnDestroy() {
		this._socketService.leaveRoom(this.articleId());
	}

	get safeHtml(): SafeHtml {
		if (!this.versionForm.controls.content.value) {
			return "";
		}

		return this._sanitizer.bypassSecurityTrustHtml(
			this.versionForm.controls.content.value.replace(
				/<(h1|h2|h3|li|ul|ol|p)><\/\1>/g,
				"<p><br></p>"
			)
		);
	}

	public toggleMode() {
		if (this.currentMode == EArticleMode.PREVIEW) {
			this.currentMode = EArticleMode.EDIT;

			this.savedVersionForm = structuredClone(
				this.versionForm.value as IVersion
			);
		} else {
			this.currentMode = EArticleMode.PREVIEW;

			if (this.savedVersionForm) {
				this.versionForm.patchValue(this.savedVersionForm);
			}
		}
	}

	public saveArticle() {
		if (!this.versionForm.valid) return;

		this._articleService
			.updateArticle(this.versionForm.value as IVersion)
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
		this.versionForm.markAsUntouched();
	}

	public deleteArticle() {
		this._articleService.deleteArticle(this.articleId()).subscribe({
			next: () => {
				this._alertService.show({
					message: "Article was deleted!",
					type: "success",
					timeout: 5000,
				});
				this._router.navigate(["/articles"]);
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
				const current = this.versionForm.controls.attachments.value || [];
				this.versionForm.controls.attachments.setValue([
					...current,
					attachment,
				]);
				this._alertService.show({
					message: "Attachment was uploaded!",
					type: "success",
					timeout: 5000,
				});
				this.versionForm.markAsTouched();
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
