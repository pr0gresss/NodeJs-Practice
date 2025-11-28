import {
	Component,
	computed,
	forwardRef,
	input,
	OnInit,
	Optional,
	signal,
	SkipSelf,
} from "@angular/core";
import {QuillModule} from "ngx-quill";
import {ControlErrorsComponent} from "../control-errors/control-errors.component";
import { ControlContainer, FormControl, NG_VALUE_ACCESSOR, ɵInternalFormsSharedModule } from "@angular/forms";
import {TInputState} from "../input/input.component";

@Component({
	selector: "app-wysiwyg-input",
	imports: [QuillModule, ControlErrorsComponent, ɵInternalFormsSharedModule],
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
export class WysiwygInputComponent implements OnInit {
	public theme = input<"snow">("snow");
	public formControlName = input<string>("");
	public state = signal<TInputState>("default");

	constructor(
		@Optional() @SkipSelf() private controlContainer: ControlContainer
	) {}

	public ngOnInit(): void {
		const c = this.control();

		c!.statusChanges.subscribe(() => this.updateState());
		c!.valueChanges.subscribe(() => this.updateState());
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
}
