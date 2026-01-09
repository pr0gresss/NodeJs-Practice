import {inject, Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import { Observable } from "rxjs";
import { IUser } from "../entities/IUser";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private _baseService = inject(BaseService);

	public getUsers(): Observable<IUser[]> {
		return this._baseService.get("users");
	}

	public getUserById(userId: string): Observable<IUser> {
		return this._baseService.get(`users/${userId}`);
	}
}
