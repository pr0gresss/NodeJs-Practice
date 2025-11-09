import { Component, input } from '@angular/core';
import { IAttachment } from '../../../shared/entities/IAttachment';

@Component({
  selector: 'app-attachment-preview',
  imports: [],
  templateUrl: './attachment-preview.component.html',
  styleUrl: './attachment-preview.component.scss',
})
export class AttachmentPreviewComponent {
  public attachment = input<IAttachment | null>(null); 
}
