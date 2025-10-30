import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IArticle } from '../entities/IArticle';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _baseService = inject(BaseService);

  public getArticles(): Observable<IArticle[]> {
    return this._baseService.get('articles');
  }

  public getArticleById(articleId: string): Observable<IArticle> {
    return this._baseService.get(`articles/${articleId}`);
  }

  public postArticle(article: IArticle): Observable<IArticle> {
    return this._baseService.post('articles', article);
  }
}
