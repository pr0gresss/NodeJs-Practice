import {inject, Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IUser} from "../entities/IUser";

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

	public editUser(userForm: {id: string; email: string; roleId: string}) {
		return this._baseService.post(`users/${userForm.id}`, userForm);
	}
}
