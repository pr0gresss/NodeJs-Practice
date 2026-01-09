import {Component, inject, input, OnInit, signal} from "@angular/core";
import {VersionService} from "../../../shared/services/version.service";
import {IVersion} from "../../../shared/entities/IVersion";
import {AlertService} from "../../../shared/services/alert.service";
import { AttachmentsBlockComponent } from "../../molecules/attachments-block/attachments-block.component";

@Component({
	selector: "app-article-version-page",
	imports: [AttachmentsBlockComponent],
	templateUrl: "./article-version-page.component.html",
	styleUrl: "./article-version-page.component.scss",
})
export class ArticleVersionPageComponent implements OnInit {
	private _versionService = inject(VersionService);
	private _alertService = inject(AlertService);
	public versionId = input.required<string>();

	public version = signal<IVersion | null>(null);

	public ngOnInit(): void {
		this._versionService.getVersionById(this.versionId()).subscribe({
			next: version => {
				this.version.set(version);
			},
			error: err => {
				this._alertService.show({
					type: "error",
					timeout: 3000,
					message: err.error.error,
				});
			},
		});
	}
}
