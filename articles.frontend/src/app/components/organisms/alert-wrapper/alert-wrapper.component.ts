import { Component, inject, input, OnInit } from '@angular/core';
import { Alert, AlertService } from '../../../shared/services/alert.service';
import { AlertComponent } from '../../molecules/alert/alert.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-alert-wrapper',
  imports: [AlertComponent],
  templateUrl: './alert-wrapper.component.html',
  styleUrl: './alert-wrapper.component.scss',
})
export class AlertWrapperComponent implements OnInit {
  private _alertService = inject(AlertService);
  protected alerts: Alert[] = [];

  public ngOnInit(): void {
    this._alertService.alerts.subscribe((a: Alert[]) => this.alerts = a)
  }
}
