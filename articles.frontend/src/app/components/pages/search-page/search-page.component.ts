import {Component, inject, signal} from "@angular/core";
import {InputComponent} from "../../atoms/input/input.component";
import {ButtonComponent} from "../../atoms/button/button.component";
import {ArticleCardComponent} from "../../organisms/article-card/article-card.component";
import {ArticleService} from "../../../shared/services/article.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {IArticle} from "../../../shared/entities/IArticle";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
	selector: "app-search-page",
	imports: [InputComponent, ButtonComponent, ArticleCardComponent, ReactiveFormsModule],
	templateUrl: "./search-page.component.html",
	styleUrl: "./search-page.component.scss",
})
export class SearchPageComponent {
	private _alertService = inject(AlertService);
	private _articleService = inject(ArticleService);

	public isFirstSearch = signal<boolean>(true);
	public isLoading = signal<boolean>(false);

	public articles = signal<IArticle[]>([]);
	public searchForm = new FormGroup({
		query: new FormControl(""),
	});

	public handleSearch() {
		this.isLoading.set(true);

		this._articleService.search(this.searchForm.value.query!).subscribe({
			next: result => {
				this.articles.set(result);
			},
			error: (err) => {
				this._alertService.show({type: "error", timeout: 3000, message: err.error.error})
			},
			complete: () => {
				this.isLoading.set(false)
				
				if(this.isFirstSearch()) {
					this.isFirstSearch.set(false)
				}
			}
		});
	}
}
