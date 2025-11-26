import {
	Component,
	OnInit,
	Optional,
	SkipSelf,
	computed,
	forwardRef,
	input,
	signal,
} from "@angular/core";
import {
	NG_VALUE_ACCESSOR,
	ControlContainer,
	FormControl,
	ValidationErrors,
} from "@angular/forms";
import {IconComponent, TIcon} from "../icon/icon.component";
import {ControlErrorsComponent} from "../control-errors/control-errors.component";
import {NgTemplateOutlet, NgClass} from "@angular/common";

type TInputState = "default" | "error" | "success";

type TInputType = "text" | "email" | "password" | "number";

@Component({
	selector: "app-input",
	templateUrl: "./input.component.html",
	styleUrls: ["./input.component.scss"],
	imports: [IconComponent, ControlErrorsComponent, NgTemplateOutlet, NgClass],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		},
	],
})
export class InputComponent implements OnInit {
	public formControlName = input<string>("");
	public label = input<string>("");
	public actionIcon = input<TIcon>("");
	public type = input<TInputType>("text");
	public placeholder = input<string>("");

	public value = "";
	public disabled = input<boolean>(false);
	public state = signal<TInputState>("default");

	public control = computed(() => {
		const name = this.formControlName();
		if (!name || !this.controlContainer) return null;
		return this.controlContainer.control?.get(name) as FormControl;
	});

	constructor(
		@Optional() @SkipSelf() private controlContainer: ControlContainer
	) {}

	public ngOnInit(): void {
		const c = this.control();

		c!.statusChanges.subscribe(() => this.updateState());
    c!.valueChanges.subscribe(() => this.updateState());
	}

	updateState() {
		const c = this.control();

		console.log(this.control()?.errors)
		if (!c) return this.state.set("default");

		if (c.invalid && c.touched) return this.state.set("error");

		if (c.valid && c.touched) return this.state.set("success");

		return this.state.set("default");
	}

	public onChange = (value: any) => {};
	public onTouched = () => {};

	public writeValue(v: any) {
		this.value = v ?? "";
	}

	public registerOnChange(fn: any) {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean) {
	}

	handleInput(event: any) {
		this.control()?.markAsTouched()
		const v = event.target.value;
		this.value = v;
		this.onChange(v);
		this.onTouched();
	}
}
