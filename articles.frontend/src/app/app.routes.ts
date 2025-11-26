import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { CreateArticlePageComponent } from './components/pages/create-article-page/create-article-page.component';
import { ArticlePageComponent } from './components/pages/article-page/article-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'create',
    component: CreateArticlePageComponent,
  },
  {
    path: 'article/:articleId',
    component: ArticlePageComponent,
  },
];
