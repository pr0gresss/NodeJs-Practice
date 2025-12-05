import { IVersion } from "./IVersion";

export interface IArticle {
	versions: IVersion[]
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
