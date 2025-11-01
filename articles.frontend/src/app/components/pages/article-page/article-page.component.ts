import { Component, inject, OnInit, signal } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { IArticle } from '../../../shared/entities/IArticle';
import { ArticleService } from '../../../shared/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

enum EArticleMode {
  PREVIEW,
  EDIT,
}

@Component({
  selector: 'app-article-page',
  imports: [QuillModule, ReactiveFormsModule],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent implements OnInit {
  private _router: Router = inject(Router);
  private _articleService = inject(ArticleService);
  private sanitizer = inject(DomSanitizer);
  private _route = inject(ActivatedRoute);
  private articleId = signal<string | null>(null);

  protected readonly MODE = EArticleMode;
  protected articleForm = new FormGroup({
    id: new FormControl<string | null>(this.articleId()),
    title: new FormControl<string>(''),
    content: new FormControl<string>(''),
  });

  public currentMode = EArticleMode.PREVIEW;

  ngOnInit(): void {
    this.articleId.set(this._route.snapshot.paramMap.get('id'));

    if (this.articleId()) {
      this._articleService.getArticleById(this.articleId()!).subscribe({
        next: (data) => {
          this.articleForm.patchValue(data);
        },
      });
    }
  }

  get safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.articleForm.controls.content.value || ''
    );
  }

  public toggleMode() {
    if (this.currentMode == EArticleMode.PREVIEW) {
      this.currentMode = EArticleMode.EDIT;
    } else {
      this.currentMode = EArticleMode.PREVIEW;
      this._articleService.getArticleById(this.articleId()!).subscribe({
        next: (data) => {
          this.articleForm.patchValue(data);
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
    this._router.navigate(['/']);
  }
}
