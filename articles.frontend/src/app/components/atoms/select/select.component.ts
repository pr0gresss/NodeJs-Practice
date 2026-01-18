import { Component, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
	],
})
export class SelectComponent {
	public formControlName = input<string>("");
	
	public options = input.required<any[]>();
	public displayField = input.required<string>();
	public valueField = input.required<string>();
	public disabled = input<boolean>(false);
	public label = input<string>("");


  public internalValue = signal<any>(null);
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  public selectValue(event: Event) {
    const target = event.target as HTMLSelectElement;
    const val = target.value;
    this.internalValue.set(val);
    this.onChange(val);
    this.onTouched();
  }
}
