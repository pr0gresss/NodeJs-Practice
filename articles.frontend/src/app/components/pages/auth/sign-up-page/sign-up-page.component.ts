import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { InputComponent } from '../../../atoms/input/input.component';
import { ButtonComponent } from '../../../atoms/button/button.component';

@Component({
  selector: 'app-sign-up-page',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, RouterLink],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
	private _authService = inject(AuthService);
	private _alertService = inject(AlertService);
	private _router = inject(Router);

	public authForm = new FormGroup({
		email: new FormControl<string>("", [Validators.required]),
		password: new FormControl<string>("", [Validators.required]),
	});

	public signUp() {
		const authData = this.authForm.value as {email: string, password: string}
		this._authService.signUp(authData).subscribe({
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
