import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticleService } from '../../../shared/services/article.service';
import { IArticle } from '../../../shared/entities/IArticle';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [DatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private _articleService: ArticleService = inject(ArticleService);

  public articles = signal<IArticle[] | null>(null);
  public articleForm = new FormGroup({
    title: new FormControl<string>(''),
    content: new FormControl<string>(''),
  });

  ngOnInit(): void {
    this._articleService.getArticles().subscribe({
      next: (data) => {
        this.articles.set(data);
      },
      error: (err) => {
        console.error('Cannot get articles! ', err);
      },
    });
  }

  public handleFormSubmit() {}
}
