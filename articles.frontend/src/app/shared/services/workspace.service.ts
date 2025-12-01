import {inject, Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IWorkspace} from "../entities/IWorkspace";

@Injectable({
	providedIn: "root",
})
export class WorkspaceService {
	private _baseService = inject(BaseService);

	public getWorkspaces(): Observable<IWorkspace[]> {
		return this._baseService.get("workspaces");
	}

	public createWorkspace(name: string): Observable<IWorkspace> {
		return this._baseService.post("workspaces", {name});
	}

	public updateWorkspace(workspace: IWorkspace) {
		return this._baseService.put("workspaces", workspace);
	}

	public getWorkspaceById(workspaceId: string): Observable<IWorkspace> {
		return this._baseService.get(`workspaces/${workspaceId}`);
	}

	public deleteWorkspace(workspaceId: string) {
		return this._baseService.delete(`workspaces/${workspaceId}`);
	}
}
