import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticleService } from '../../../shared/services/article.service';
import { IArticle } from '../../../shared/entities/IArticle';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ArticleCardComponent } from '../../organisms/article-card/article-card.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [
    QuillModule,
    CommonModule,
    ReactiveFormsModule,
    ArticleCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private _router = inject(Router);
  private _articleService: ArticleService = inject(ArticleService);

  public articles = signal<IArticle[] | null>(null);

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

  public goToCreatePage() {
    this._router.navigate(["create"])
  }
}
