import {Component, HostBinding, Input, input} from "@angular/core";
import {IconComponent, TIcon} from "../icon/icon.component";

export type TButtonVariant = "primary" | "secondary" | "outline" | "text";

export type TButtonSize = "small" | "medium" | "large";

@Component({
	selector: "app-button",
	imports: [IconComponent],
	templateUrl: "./button.component.html",
	styleUrl: "./button.component.scss",
})
export class ButtonComponent {
	public icon = input<TIcon>("");
	public disabled = input<boolean>(false);

	@HostBinding("attr.size")
	@Input()
	public size: TButtonSize = "medium";

	@HostBinding("attr.variant")
	@Input()
	public variant: TButtonVariant = "primary";
}
