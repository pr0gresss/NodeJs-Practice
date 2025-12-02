import {Component, DestroyRef, inject, OnInit, signal} from "@angular/core";
import {ArticleService} from "../../../shared/services/article.service";
import {IArticle} from "../../../shared/entities/IArticle";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import {ArticleCardComponent} from "../../organisms/article-card/article-card.component";
import {SelectComponent} from "../../atoms/select/select.component";
import {WorkspaceService} from "../../../shared/services/workspace.service";
import {IWorkspace} from "../../../shared/entities/IWorkspace";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import { ButtonComponent } from "../../atoms/button/button.component";

@Component({
	standalone: true,
	selector: "app-workspace-articles-page",
	imports: [
		QuillModule,
		CommonModule,
		ReactiveFormsModule,
		ArticleCardComponent,
		SelectComponent,
		ButtonComponent
	],
	templateUrl: "./workspace-articles-page.component.html",
	styleUrl: "./workspace-articles-page.component.scss",
})
export class WorkspaceArticlesPage implements OnInit {
	private _articleService: ArticleService = inject(ArticleService);
	private _workspaceService = inject(WorkspaceService);
	private _destroyRef = inject(DestroyRef);

	public workspaces = signal<IWorkspace[] | null>(null);
	public workspaceForm = new FormGroup({
		workspace: new FormControl<string | null>(null),
	});
	public articles = signal<IArticle[] | null>(null);

	ngOnInit(): void {
		this._workspaceService.getWorkspaces().subscribe({
			next: data => {
				this.workspaces.set(data);
				this.workspaceForm.controls.workspace.setValue(data[0].id!);
			},
		});

		this.workspaceForm.controls.workspace.valueChanges
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(ws => {
				if (!ws) return;

				this._articleService.getArticlesByWorkspaceId(ws).subscribe({
					next: (articles: IArticle[]) => {
						console.log(articles);
						this.articles.set(articles);
					},
				});
			});
	}
}
