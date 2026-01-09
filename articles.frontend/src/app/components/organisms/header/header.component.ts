import {Component, inject, OnInit, signal} from "@angular/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IconComponent} from "../../atoms/icon/icon.component";
import {AuthService} from "../../../shared/services/auth.service";
import {RoleService} from "../../../shared/services/role.service";

@Component({
	standalone: true,
	selector: "app-header",
	imports: [RouterLink, RouterLinkActive, IconComponent],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
	private _roleService = inject(RoleService);
	public authService = inject(AuthService);
	public isAdmin = signal(false);

	ngOnInit(): void {
		this._roleService.getAll().subscribe({
			next: roles => {
				this.authService.getMe().subscribe({next:(user) => {
					this.isAdmin.set(
					roles.filter(role => role.name === "Admin")[0]!.id ==
						user.roleId!
				);
				}})
			},
		});
	}

	public signOut() {
		this.authService.signOut();
	}
}
