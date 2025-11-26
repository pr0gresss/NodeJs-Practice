import { Component, input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-control-errors',
  imports: [ErrorComponent],
  templateUrl: './control-errors.component.html',
  styleUrl: './control-errors.component.scss',
})
export class ControlErrorsComponent {
  public errors = input.required<ValidationErrors>();
}
