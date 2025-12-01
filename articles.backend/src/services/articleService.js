const {
	Article,
	Attachment,
	ArticleAttachment,
	sequelize,
} = require("../db/models/");
const {BASE_URL} = require("../config/environment");

class ArticleService {
	static async getAll() {
		const articles = await Article.findAll({
			include: [
				{
					model: Attachment,
					as: "attachments",
					through: {attributes: []},
				},
			],
		});

		return articles;
	}

	static async getById(id) {
		const article = await Article.findByPk(id, {
			include: [
				{
					model: Attachment,
					as: "attachments",
					through: {attributes: []},
				},
			],
		});

		return article || null;
	}

	static async create({title, content, attachments = []}) {
		if (!title?.trim() || !content?.trim()) {
			throw new Error("Title and content are required");
		}

		return await sequelize.transaction(async t => {
			const article = await Article.create({title, content}, {transaction: t});

			if (attachments.length) {
				await ArticleAttachment.bulkCreate(
					attachments.map(attachment => ({
						articleId: article.id,
						attachmentId: attachment.id,
					})),
					{transaction: t}
				);
			}

			return article;
		});
	}

	static async update({id, title, content, attachments = []}) {
		const article = await Article.findByPk(id);
		if (!article) return null;

		return await sequelize.transaction(async t => {
			await article.update(
				{
					title: title?.trim() ?? article.title,
					content: content?.trim() ?? article.content,
				},
				{transaction: t}
			);

			if (attachments.length) {
				await ArticleAttachment.destroy({
					where: {articleId: id},
					transaction: t,
				});

				await ArticleAttachment.bulkCreate(
					attachments.map(attachment => ({
						articleId: id,
						attachmentId: attachment.id,
					})),
					{transaction: t}
				);
			}

			return article;
		});
	}

	static async delete(id) {
		return sequelize.transaction(async t => {
			await ArticleAttachment.destroy({
				where: {articleId: id},
				transaction: t,
			});

			const deleted = await Article.destroy({
				where: {id},
				transaction: t,
			});

			return deleted > 0;
		});
	}

	static async uploadAttachment(file) {
		if (!file) {
			throw new Error("No file uploaded");
		}

		const attachment = await Attachment.create({
			filename: file.filename,
			url: `${BASE_URL}/uploads/${file.filename}`,
			mimetype: file.mimetype,
			size: file.size,
		});

		return attachment;
	}
}

module.exports = ArticleService;
