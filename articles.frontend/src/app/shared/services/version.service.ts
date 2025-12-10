import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import { IVersion } from "../entities/IVersion";

@Injectable({
	providedIn: "root",
})
export class VersionService {
	private _baseService = inject(BaseService);

	public getVersionById(versionId: string): Observable<IVersion> {
		return this._baseService.get(`version/${versionId}`);
	}

	public getVersionsByArticleId(articleId: string): Observable<IVersion[]> {
		return this._baseService.get(`versions/${articleId}`);
	}
}
