import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-upload-button',
  imports: [ButtonComponent],
  templateUrl: './upload-button.component.html',
  styleUrl: './upload-button.component.scss',
})
export class UploadButtonComponent {
  @ViewChild("input", {static:false})
  public input!: ElementRef<HTMLInputElement>;

  public accept = input<string>();
  public disabled = input<boolean>(false);
}
