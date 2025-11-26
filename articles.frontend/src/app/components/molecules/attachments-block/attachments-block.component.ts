import { Component, input } from '@angular/core';
import { IAttachment } from '../../../shared/entities/IAttachment';
import { AttachmentPreviewComponent } from '../../atoms/attachment-preview/attachment-preview.component';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'app-attachments-block',
  imports: [AttachmentPreviewComponent, IconComponent],
  templateUrl: './attachments-block.component.html',
  styleUrl: './attachments-block.component.scss',
})
export class AttachmentsBlockComponent {
  public attachments = input<IAttachment[]>([]);
}
