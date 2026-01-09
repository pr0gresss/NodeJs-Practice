import {Routes} from "@angular/router";
import {WorkspaceArticlesPage} from "./components/pages/workspace-articles-page/workspace-articles-page.component";
import {CreateArticlePageComponent} from "./components/pages/create-article-page/create-article-page.component";
import {ArticlePageComponent} from "./components/pages/article-page/article-page.component";
import {WorkspaceManagePageComponent} from "./components/pages/workspace-manage-page/workspace-manage-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {ArticleVersionsPageComponent} from "./components/pages/article-versions-page/article-versions-page.component";
import {ArticleVersionPageComponent} from "./components/pages/article-version-page/article-version-page.component";
import {authGuard} from "./shared/guards/auth.guard";
import {SignInPageComponent} from "./components/pages/auth/sign-in-page/sign-in-page.component";
import {SignUpPageComponent} from "./components/pages/auth/sign-up-page/sign-up-page.component";

export const routes: Routes = [
	{path: "", pathMatch: "full", redirectTo: "home"},
	{
		path: "",
		children: [{path: "home", component: HomePageComponent}],
	},
	{
		path: "",
		children: [{path: "create", component: CreateArticlePageComponent}],
		canActivate: [authGuard],
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
			{
				path: ":articleId/versions",
				component: ArticleVersionsPageComponent,
			},
			{
				path: ":articleId/versions/:versionId",
				component: ArticleVersionPageComponent,
			},
		],
		canActivate: [authGuard],
	},
	{
		path: "workspace",
		children: [
			{
				path: "manage",
				component: WorkspaceManagePageComponent,
			},
		],
		canActivate: [authGuard],
	},
	{
		path: "auth",
		children: [
			{path: "", pathMatch: "full", redirectTo: "sign-in"},
			{path: "sign-in", component: SignInPageComponent},
			{path: "sign-up", component: SignUpPageComponent},
		],
	},
];
