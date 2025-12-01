import {inject, Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IComment} from "../entities/IComment";

@Injectable({
	providedIn: "root",
})
export class CommentService {
	private _baseService = inject(BaseService);

	public getComments(): Observable<IComment[]> {
		return this._baseService.get("comments");
	}

	public postComment(articleId:string, comment: IComment): Observable<IComment> {
		console.log("posy")
		return this._baseService.post("comments", {articleId, ...comment});
	}

	public updateComment(comment: IComment) {
		return this._baseService.put("comments", comment);
	}

	public getCommentsByArticleId(articleId: string): Observable<IComment[]> {
		return this._baseService.get(`comments/${articleId}`);
	}

	public deleteComment(commentId: string) {
		return this._baseService.delete(`comments/${commentId}`);
	}
}
