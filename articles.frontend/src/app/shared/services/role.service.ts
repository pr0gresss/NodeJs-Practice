import {inject, Injectable, signal} from "@angular/core";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IRole} from "../entities/IRole";

@Injectable({
	providedIn: "root",
})
export class RoleService {
	private _baseService = inject(BaseService);

	public getAll(): Observable<IRole[]> {
		return this._baseService.get("roles");
	}

	public getById(roleId: string) {
		return this._baseService.get(`roles/${roleId}`);
	}

	public createRole(roleForm: IRole): Observable<IRole> {
		return this._baseService.post("roles", roleForm);
	}

	public deleteRole(roleId: string) {
		return this._baseService.get(`roles/${roleId}`);
	}
}
