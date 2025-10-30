import { Component, inject } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArticleService } from '../../../shared/services/article.service';
import { IArticle } from '../../../shared/entities/IArticle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article-page',
  imports: [QuillModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-article-page.component.html',
  styleUrl: './create-article-page.component.scss',
})
export class CreateArticlePageComponent {
  private _router = inject(Router);
  private _articleService = inject(ArticleService);
  public articleForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public handleFormSubmit() {
    const newArticle = this.articleForm.value as IArticle;

    this._articleService.postArticle(newArticle).subscribe({
      next: (res) => {
        this._router.navigate(["article", res.id!])
      },
      error: (err) => alert(err.error.error),
    });
  }
}
