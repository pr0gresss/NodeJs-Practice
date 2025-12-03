import { Component, input } from '@angular/core';
import { CommentComponent } from '../../atoms/comment/comment.component';
import { IComment } from '../../../shared/entities/IComment';

@Component({
  selector: 'app-comment-list',
  imports: [CommentComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
})
export class CommentListComponent {
	public comments = input.required<IComment[]>();
}
