import { Component, input } from '@angular/core';
import { IComment } from '../../../shared/entities/IComment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
	public comment = input.required<IComment>();
}
