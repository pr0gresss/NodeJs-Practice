import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from "../../atoms/button/button.component";


@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
}
