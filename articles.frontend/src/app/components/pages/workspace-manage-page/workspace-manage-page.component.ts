import {Component, inject, OnInit, signal} from "@angular/core";
import {InputComponent} from "../../atoms/input/input.component";
import {ButtonComponent} from "../../atoms/button/button.component";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
	ɵInternalFormsSharedModule,
} from "@angular/forms";
import {IWorkspace} from "../../../shared/entities/IWorkspace";
import {WorkspaceService} from "../../../shared/services/workspace.service";
import {AlertService} from "../../../shared/services/alert.service";
import {DatePipe} from "@angular/common";

@Component({
	selector: "app-workspace-manage-page",
	imports: [
		InputComponent,
		ButtonComponent,
		ɵInternalFormsSharedModule,
		ReactiveFormsModule,
		DatePipe,
	],
	templateUrl: "./workspace-manage-page.component.html",
	styleUrl: "./workspace-manage-page.component.scss",
})
export class WorkspaceManagePageComponent implements OnInit {
	private _workspaceService = inject(WorkspaceService);
	private _alertService = inject(AlertService);

	public workspaceForm = new FormGroup({
		name: new FormControl<string>("", [Validators.required]),
	});

	public workspaces = signal<IWorkspace[] | null>(null);

	public ngOnInit(): void {
		this.getWorkspaces();
	}

	public getWorkspaces() {
		this._workspaceService.getWorkspaces().subscribe({
			next: data => {
				this.workspaces.set(data);
			},
			error: err => {
				this._alertService.show({
					type: "error",
					timeout: 3000,
					message: err.err.message,
				});
			},
		});
	}

	public deleteWorkspace(workspaceId: string) {
		this._workspaceService.deleteWorkspace(workspaceId).subscribe({
			next: () => {
				this._alertService.show({
					type: "success",
					timeout: 3000,
					message: "Workspace have been deleted!",
				});
			},
			error: err => {
				this._alertService.show({
					type: "error",
					timeout: 3000,
					message: err.err.message,
				});
			},
			complete: () => {
				this.getWorkspaces()
			}
		});
	}

	public handleWorkspaceCreate() {
		if (!this.workspaceForm.valid) return;

		this._workspaceService
			.createWorkspace(this.workspaceForm.value.name!)
			.subscribe({
				next: data => {
					this._alertService.show({
						type: "success",
						timeout: 3000,
						message: "New workspace have been created!",
					});
					this.getWorkspaces();
					this.workspaceForm.reset();
				},
			});
	}
}
