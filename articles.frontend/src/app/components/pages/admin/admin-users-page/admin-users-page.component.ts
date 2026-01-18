import {Component, signal, inject, OnInit} from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {IUser} from "../../../../shared/entities/IUser";
import {SelectComponent} from "../../../atoms/select/select.component";
import {UserService} from "../../../../shared/services/user.service";
import {RoleService} from "../../../../shared/services/role.service";
import {ButtonComponent} from "../../../atoms/button/button.component";
import {InputComponent} from "../../../atoms/input/input.component";
import {IRole} from "../../../../shared/entities/IRole";
import {AlertService} from "../../../../shared/services/alert.service";

@Component({
	selector: "app-admin-users-page",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		SelectComponent,
		ButtonComponent,
		InputComponent,
	],
	templateUrl: "./admin-users-page.component.html",
	styleUrl: "./admin-users-page.component.scss",
})
export class AdminUsersPageComponent implements OnInit {
	private _userService = inject(UserService);
	private _roleService = inject(RoleService);
	private _alertService = inject(AlertService);

	editingUserId = signal<string | null>(null);
	forms = new Map<string, FormGroup>();

	ngOnInit(): void {
		this._userService.getUsers().subscribe(data => {
			this.users.set(data);

			data.forEach(user => {
				if (this.forms.has(user.id!)) {
					this.forms.get(user.id!)!.patchValue({roleId: user.roleId});
				}
			});
		});

		this._roleService.getAll().subscribe(data => {
			this.roles.set(data);

			this.users().forEach(user => {
				if (this.forms.has(user.id!)) {
					this.forms.get(user.id!)!.patchValue({roleId: user.roleId});
				}
			});
		});
	}

	users = signal<IUser[]>([]);
	roles = signal<IRole[]>([]);

	getRoleName(roleId: string) {
		return this.roles().filter(v => roleId === v.id)[0].name!;
	}

	getForm(user: IUser): FormGroup {
		if (!this.forms.has(user.id!) && this.roles().length) {
			this.forms.set(
				user.id!,
				new FormGroup({
					roleId: new FormControl(user.roleId, [Validators.required]),
					email: new FormControl(user.email, [
						Validators.required,
						Validators.email,
					]),
				})
			);
		}
		return this.forms.get(user.id!)!;
	}

	edit(user: IUser) {
		this.editingUserId.set(user.id!);
	}

	cancel() {
		this.editingUserId.set(null);
	}

	save(user: IUser) {
		const form = this.getForm(user);

		const updated = {
			...user,
			...form.value,
		};

		this._userService.editUser(updated).subscribe({
			next: () => {
				this._alertService.show({
					type: "success",
					timeout: 3000,
					message: "Success!",
				});
				this._userService.getUsers().subscribe(data => this.users.set(data));
			},
			error: err => {
				this._alertService.show({
					type: "error",
					timeout: 3000,
					message: err.error.error,
				});
			},
			complete: () => {
				this.cancel();
			},
		});

		this.cancel();
	}
}
