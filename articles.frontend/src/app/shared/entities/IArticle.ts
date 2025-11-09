import {IAttachment} from "./IAttachment";

export interface IArticle {
	title: string;
	content: string;
	attachments?: IAttachment[];
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
