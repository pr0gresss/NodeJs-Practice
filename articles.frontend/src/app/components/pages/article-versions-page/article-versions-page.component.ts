import {Component, inject, input, OnInit, signal} from "@angular/core";
import {VersionService} from "../../../shared/services/version.service";
import {IVersion} from "../../../shared/entities/IVersion";
import {AlertService} from "../../../shared/services/alert.service";
import { DatePipe } from "@angular/common";
import { IconComponent } from "../../atoms/icon/icon.component";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-article-versions-page",
	imports: [DatePipe, IconComponent, RouterLink],
	templateUrl: "./article-versions-page.component.html",
	styleUrl: "./article-versions-page.component.scss",
})
export class ArticleVersionsPageComponent implements OnInit {
	private _versionService = inject(VersionService);
	private _alertService = inject(AlertService);
	public articleId = input.required<string>();

	public versions = signal<IVersion[]>([]);

	public ngOnInit(): void {
		this._versionService.getVersionsByArticleId(this.articleId()).subscribe({
			next: (versions) => {
				this.versions.set(versions);
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
