import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import { BaseService } from "./base.service";

export interface IVersion {
	content: string,
	title: string,
	createdAt?: Date,
	updatedAt?: Date,
}


@Injectable({
	providedIn: "root",
})
export class AlertService {
	private _baseService = inject(BaseService);

	public getVersionById(versionId: string): Observable<IVersion> {
		return of()
	}

	public getVersionsByArticleId(articleId: string): Observable<IVersion[]> {
		return of([])
	}
}
