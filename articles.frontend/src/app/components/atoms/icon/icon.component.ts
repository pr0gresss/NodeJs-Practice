import {Component, HostBinding, Input, input, Signal} from "@angular/core";

export type TIcon =
	| ""
	| "plus"
	| "plus-circle"
	| "plus-square"
	| "inbox"
	| "arrow-down"
	| "arrow-left"
	| "arrow-right"
	| "arrow-up"
	| "cancel"
	| "chat"
	| "x"
	| "x-circle"
	| "download"
	| "expand-down-double"
	| "expand-down"
	| "expand-left-double"
	| "expand-left"
	| "expand-right-double"
	| "expand-right"
	| "expand-up-double"
	| "expand-up"
	| "export"
	| "heart"
	| "document"
	| "file"
	| "import"
	| "info"
	| "link"
	| "letter"
	| "moon"
	| "question"
	| "remove"
	| "sort"
	| "star"
	| "sun"
	| "user"
	| "eye-closed"
	| "eye"
	| "world"
	| "check"
	| "check-double"
	| "check-circle"
	| "edit";

@Component({
	selector: "app-icon",
	imports: [],
	templateUrl: "./icon.component.html",
	styleUrl: "./icon.component.scss",
})
export class IconComponent {
	@HostBinding("class")
	@Input({required: true})
	public icon: TIcon = "";

	@HostBinding("attr.size")
	@Input()
	public size: "small" | "regular" | "medium" | "large" = "medium";
}
