import {inject, Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IArticle} from "../entities/IArticle";
import {IAttachment} from "../entities/IAttachment";
import {SocketService} from "./ws.service";

@Injectable({
	providedIn: "root",
})
export class ArticleService {
	private _baseService = inject(BaseService);
	private _socketService = inject(SocketService);

	public getArticles(): Observable<IArticle[]> {
		return this._baseService.get("articles");
	}

	public getArticleById(articleId: string): Observable<IArticle> {
		return this._baseService.get(`articles/${articleId}`);
	}

	public postArticle(article: IArticle): Observable<IArticle> {
		return this._baseService.post("articles", article);
	}

	public updateArticle(article: IArticle) {
		const authorId = this._socketService.socket.id;

		const payload = {
			...article,
			authorId,
		};
		return this._baseService.put("articles", payload);
	}

	public deleteArticle(id: string) {
		return this._baseService.delete(`articles/${id}`);
	}

	public uploadAttachment(file: File) {
		const formData = new FormData();
		formData.append("file", file);
		return this._baseService.post<IAttachment>(
			"articles/attachments",
			formData
		);
	}
}
