import {Component, inject} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../../../atoms/input/input.component";
import { ButtonComponent } from "../../../atoms/button/button.component";
import { AuthService } from "../../../../shared/services/auth.service";
import { AlertService } from "../../../../shared/services/alert.service";
import { Router, RouterLink } from "@angular/router";
import { IUser } from "../../../../shared/entities/IUser";

@Component({
	selector: "app-sign-in-page",
	imports: [InputComponent, ReactiveFormsModule, ButtonComponent, RouterLink],
	templateUrl: "./sign-in-page.component.html",
	styleUrl: "./sign-in-page.component.scss",
})
export class SignInPageComponent {
	private _authService = inject(AuthService);
	private _alertService = inject(AlertService);
	private _router = inject(Router);

	public authForm = new FormGroup({
		email: new FormControl<string>("", [Validators.required]),
		password: new FormControl<string>("", [Validators.required]),
	});

	public signIn() {
		const authData = this.authForm.value as IUser;
		this._authService.singIn(authData).subscribe({
			next: (response) => {
				this._authService.setAccessToken(response.token)
				this._router.navigate(["/"])
			},
			error: (err) => {
				this._alertService.show({type: "error", timeout: 3000, message: err.error.message})
			}
		})
	}
}
