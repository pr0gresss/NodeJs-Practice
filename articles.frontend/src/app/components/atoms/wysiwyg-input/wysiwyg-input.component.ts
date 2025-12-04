import {
	AfterViewInit,
	Component,
	computed,
	forwardRef,
	input,
	OnInit,
	Optional,
	signal,
	SkipSelf,
	ViewChild,
} from "@angular/core";
import {QuillEditorComponent} from "ngx-quill";
import {ControlErrorsComponent} from "../control-errors/control-errors.component";
import {
	ControlContainer,
	ControlValueAccessor,
	FormControl,
	NG_VALUE_ACCESSOR,
} from "@angular/forms";
import {TInputState} from "../input/input.component";
import {NgClass} from "@angular/common";

@Component({
	selector: "app-wysiwyg-input",
	imports: [QuillEditorComponent, ControlErrorsComponent, NgClass],
	templateUrl: "./wysiwyg-input.component.html",
	styleUrl: "./wysiwyg-input.component.scss",
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => WysiwygInputComponent),
			multi: true,
		},
	],
})
export class WysiwygInputComponent
	implements OnInit, ControlValueAccessor, AfterViewInit
{
	public theme = input<"snow">("snow");
	public label = input<string>("");
	public disabled = input<boolean>(false);
	public formControlName = input<string>("");
	public state = signal<TInputState>("default");

	private onChange: (val: any) => void = () => {};
	private onTouched: () => void = () => {};

	@ViewChild("quill", {static: false})
	quill!: QuillEditorComponent;

	constructor(
		@Optional() @SkipSelf() private controlContainer: ControlContainer
	) {}

	public ngOnInit(): void {
		const c = this.control();
		c?.statusChanges.subscribe(() => this.updateState());
		c?.valueChanges.subscribe(() => this.updateState());
	}

	public ngAfterViewInit(): void {
		this.quill.writeValue(this.control()?.value);

		this.control()?.markAsPristine();
		this.control()?.markAsUntouched();
	}

	public control = computed(() => {
		const name = this.formControlName();
		if (!name || !this.controlContainer) return null;
		return this.controlContainer.control?.get(name) as FormControl;
	});

	private updateState() {
		const c = this.control();
		if (!c) return this.state.set("default");
		if (c.invalid && c.touched) return this.state.set("error");
		if (c.valid && c.touched) return this.state.set("success");
		return this.state.set("default");
	}

	public writeValue(value: any): void {}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {}

	public onContentChanged(event: any) {
		this.control()?.markAsTouched();

		this.onChange(event.html);
	}

	public onBlur() {

		this.onTouched();
	}
}
