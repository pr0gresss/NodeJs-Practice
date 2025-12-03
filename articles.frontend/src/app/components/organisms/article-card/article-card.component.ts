import { Component, inject, input } from '@angular/core';
import { IArticle } from '../../../shared/entities/IArticle';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-card',
  imports: [DatePipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  private _router = inject(Router);
  public article = input<IArticle | null>(null);

  public goToArticle() {
    this._router.navigate(["articles", this.article()!.id])
  }
}
