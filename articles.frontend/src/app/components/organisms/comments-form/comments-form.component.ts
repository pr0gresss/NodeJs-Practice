import {
	Component,
	computed,
	inject,
	input,
	OnInit,
	signal,
} from "@angular/core";
import {CommentListComponent} from "../../molecules/comment-list/comment-list.component";
import {ButtonComponent} from "../../atoms/button/button.component";
import {InputComponent} from "../../atoms/input/input.component";
import {CommentService} from "../../../shared/services/comment.service";
import {IComment} from "../../../shared/entities/IComment";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
	selector: "app-comments-form",
	imports: [
		CommentListComponent,
		ButtonComponent,
		InputComponent,
		ReactiveFormsModule,
	],
	templateUrl: "./comments-form.component.html",
	styleUrl: "./comments-form.component.scss",
})
export class CommentsFormComponent implements OnInit {
	private _commentService = inject(CommentService);
	private _alertService = inject(AlertService);

	public articleId = input.required<string>();
	public comments = signal<IComment[] | null>(null);
	public commentForm = new FormGroup({
		content: new FormControl("", [Validators.required]),
	});

	public ngOnInit(): void {
		this.getComments()
	}

	public getComments() {
		this._commentService
			.getCommentsByArticleId(this.articleId())
			.subscribe(data => this.comments.set(data));
	}

	public handlePostComment() {
		if (!this.commentForm.valid) return;

		const comment = this.commentForm.value as IComment;
		this._commentService.postComment(this.articleId(), comment).subscribe({
			next: response => {
				this.commentForm.reset();
				this.getComments();
			},
			error: err => {
				this._alertService.show({
					timeout: 3000,
					message: err.error.message,
					type: "error",
				});
			},
		});
	}
}
