import {Routes} from "@angular/router";
import {WorkspaceArticlesPage} from "./components/pages/workspace-articles-page/workspace-articles-page.component";
import {CreateArticlePageComponent} from "./components/pages/create-article-page/create-article-page.component";
import {ArticlePageComponent} from "./components/pages/article-page/article-page.component";
import {WorkspaceManagePageComponent} from "./components/pages/workspace-manage-page/workspace-manage-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";

export const routes: Routes = [
	{
		path: "",
		component: HomePageComponent,
	},
	{
		path: "create",
		component: CreateArticlePageComponent,
	},
	{
		path: "articles",
		children: [
			{
				path: "",
				component: WorkspaceArticlesPage,
			},
			{
				path: ":articleId",
				component: ArticlePageComponent,
			},
		],
	},
	{
		path: "workspace",
		children: [
			{
				path: "manage",
				component: WorkspaceManagePageComponent,
			},
		],
	},
];
