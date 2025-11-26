import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

export type TAlertType = "info" | "error" | "success" | "warn";

export interface Alert {
	type: TAlertType;
	message: string;
	timeout?: number;
}

@Injectable({
	providedIn: "root",
})
export class AlertService {
	private alertsSubject = new BehaviorSubject<Alert[]>([]);
	public alerts = this.alertsSubject.asObservable();

	public show(alert: Alert) {
		const current = this.alertsSubject.value;
		this.alertsSubject.next([...current, alert]);

		setTimeout(() => this.remove(alert), alert.timeout ?? 3000);
	}

	public remove(alert: Alert) {
		const updated = this.alertsSubject.value.filter(a => a !== alert);
		this.alertsSubject.next(updated);
	}

	public clear() {
		this.alertsSubject.next([]);
	}
}
