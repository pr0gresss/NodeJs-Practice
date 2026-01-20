import {Component, input} from "@angular/core";
import {IconComponent} from "../../atoms/icon/icon.component";
import {IUser} from "../../../shared/entities/IUser";
import {RouterLink} from "@angular/router";

@Component({
	selector: "app-user-card",
	imports: [IconComponent],
	templateUrl: "./user-card.component.html",
	styleUrl: "./user-card.component.scss",
})
export class UserCardComponent {
	public user = input.required<IUser>();
}
