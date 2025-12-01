import {Component, inject, OnInit, signal} from "@angular/core";
import {QuillModule} from "ngx-quill";
import {CommonModule} from "@angular/common";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {ArticleService} from "../../../shared/services/article.service";
import {IArticle} from "../../../shared/entities/IArticle";
import {Router} from "@angular/router";
import {IAttachment} from "../../../shared/entities/IAttachment";
import {AttachmentsBlockComponent} from "../../molecules/attachments-block/attachments-block.component";
import {AlertService} from "../../../shared/services/alert.service";
import {ButtonComponent} from "../../atoms/button/button.component";
import {InputComponent} from "../../atoms/input/input.component";
import {UploadButtonComponent} from "../../atoms/upload-button/upload-button.component";
import {WysiwygInputComponent} from "../../atoms/wysiwyg-input/wysiwyg-input.component";
import {SelectComponent} from "../../atoms/select/select.component";
import {IWorkspace} from "../../../shared/entities/IWorkspace";
import {WorkspaceService} from "../../../shared/services/workspace.service";

@Component({
	selector: "app-create-article-page",
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AttachmentsBlockComponent,
		ButtonComponent,
		InputComponent,
		UploadButtonComponent,
		WysiwygInputComponent,
		SelectComponent,
	],
	templateUrl: "./create-article-page.component.html",
	styleUrl: "./create-article-page.component.scss",
})
export class CreateArticlePageComponent implements OnInit {
	private _router = inject(Router);
	private _articleService = inject(ArticleService);
	private _alertService = inject(AlertService);
	private _workspaceService = inject(WorkspaceService);

	public workspaces = signal<IWorkspace[] | null>(null);

	public articleForm = new FormGroup({
		title: new FormControl<string>("", {
			nonNullable: true,
			validators: [
				Validators.maxLength(40),
				Validators.minLength(3),
				Validators.required,
			],
		}),
		content: new FormControl<string>("", {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(20)],
		}),
		workspaceId: new FormControl<string>("", Validators.required),
		attachments: new FormControl<IAttachment[]>([]),
	});

	public ngOnInit(): void {
		this._workspaceService.getWorkspaces().subscribe({
			next: data => {
				this.articleForm.controls.workspaceId.setValue(data[0].id!)
				this.workspaces.set(data)},
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

	public handleFormSubmit() {
		if (!this.articleForm.valid) return;

		const newArticle = this.articleForm.value as IArticle;

		this._articleService.postArticle(newArticle).subscribe({
			next: res => {
				this._alertService.show({
					message: "Article was created!",
					type: "success",
					timeout: 5000,
				});
				this._alertService.show({
					message: "Redirecting to new Article...",
					type: "info",
					timeout: 5000,
				});
				this._router.navigate(["articles", res.id!]);
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
}
