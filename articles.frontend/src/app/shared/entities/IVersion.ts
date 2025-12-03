import { IAttachment } from "./IAttachment";

export interface IVersion {
	content: string,
	title: string,
	id?: string,
	articleId: string,
	attachments: IAttachment[];
	isLatest?: boolean,
	createdAt?: Date,
	updatedAt?: Date,
}