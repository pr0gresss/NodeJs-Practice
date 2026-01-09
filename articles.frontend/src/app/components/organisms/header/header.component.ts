import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../../atoms/icon/icon.component';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
	public authService = inject(AuthService);

	public signOut() {
		this.authService.signOut();
	}
}
