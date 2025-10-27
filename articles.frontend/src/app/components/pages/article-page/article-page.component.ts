import { Component, inject, OnInit, signal } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { IArticle } from '../../../shared/entities/IArticle';
import { ArticleService } from '../../../shared/services/article.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-page',
  imports: [QuillModule, ReactiveFormsModule],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent implements OnInit {
  private _articleService = inject(ArticleService);
  private _route = inject(ActivatedRoute);
  private articleId = signal<string | null>(null);
  protected articleForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(),
  });

  ngOnInit(): void {
    this.articleId.set(this._route.snapshot.paramMap.get('id'));

    if (this.articleId()) {
      this._articleService.getArticleById(this.articleId()!).subscribe({
        next: (data) => {
          this.articleForm.controls.content.setValue(data.content);
          this.articleForm.controls.title.setValue(data.title);
        },
      });
    }
  }
}
