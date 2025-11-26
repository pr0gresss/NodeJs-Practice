import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./components/organisms/header/header.component";
import {AlertWrapperComponent} from "./components/organisms/alert-wrapper/alert-wrapper.component";

@Component({
	standalone: true,
	selector: "app-root",
	imports: [RouterOutlet, HeaderComponent, AlertWrapperComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {
	public title = "articlesFE";
}
