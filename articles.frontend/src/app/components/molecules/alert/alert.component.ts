import { Attribute, Component, HostBinding, inject, input } from '@angular/core';
import { Alert, AlertService } from '../../../shared/services/alert.service';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  standalone: true,
  selector: 'app-alert',
  imports: [IconComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  private _alertService = inject(AlertService);
  public alert = input.required<Alert>();

  public removeAlert() {
    this._alertService.remove(this.alert());
  }
}
