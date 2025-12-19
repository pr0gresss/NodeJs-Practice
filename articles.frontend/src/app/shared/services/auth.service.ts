import {inject, Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IUser} from "../entities/IUser";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private _baseService = inject(BaseService);

	public isAuthenticated() {
		return Boolean(this.getAccessToken());
	}

	public getAccessToken() {
		return localStorage.getItem("accessToken");
	}

	public setAccessToken(token: string) {
		localStorage.setItem("accessToken", token);
	}

	public removeAccessToken() {
		localStorage.removeItem("accessToken");
	}

	public getMe() {
		return this._baseService.get("auth/me");
	}

	public signOut() {}

	public singIn(user: IUser): Observable<{user: IUser; token: string}> {
		return this._baseService.post("auth/sign-in", user);
	}

	public signUp(form: {
		email: string;
		password: string;
	}): Observable<{user: IUser; token: string}> {
		return this._baseService.post("auth/sign-up", form);
	}
}
