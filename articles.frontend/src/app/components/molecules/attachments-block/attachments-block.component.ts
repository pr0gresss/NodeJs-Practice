import { Component, input } from '@angular/core';
import { IAttachment } from '../../../shared/entities/IAttachment';
import { AttachmentPreviewComponent } from '../../atoms/attachment-preview/attachment-preview.component';

@Component({
  selector: 'app-attachments-block',
  imports: [AttachmentPreviewComponent],
  templateUrl: './attachments-block.component.html',
  styleUrl: './attachments-block.component.scss',
})
export class AttachmentsBlockComponent {
  public attachments = input<IAttachment[]>([]);
}
