const {Article, Attachment, sequelize, Version} = require("../db/models");
const VersionService = require("./version.service");
const {BASE_URL} = require("../config/environment");

class ArticleService {
	static async getAll() {
		const articles = await Article.findAll({
			include: [
				{
					model: Version,
					as: "versions",
					where: {isLatest: true},
					required: false,
					include: [
						{
							model: Attachment,
							as: "attachments",
							through: {attributes: []},
						},
					],
				},
			],
		});

		return articles;
	}

	static async getById(id) {
		const article = await Article.findByPk(id, {
			include: [
				{
					model: Version,
					as: "versions",
					required: false,
					where: {isLatest: true},
					include: [
						{
							model: Attachment,
							as: "attachments",
							through: {attributes: []},
						},
					],
				},
			],
		});

		return article || null;
	}

	static async getByWorkspaceId(workspaceId) {
		const articles = await Article.findAll({
			where: {workspaceId},
			include: [
				{
					model: Version,
					as: "versions",
					where: {isLatest: true},
					required: false,
					include: [
						{
							model: Attachment,
							as: "attachments",
							through: {attributes: []},
						},
					],
				},
			],
		});

		return articles || null;
	}

	static async getArticleVersionsByArticleId(articleId) {
		return await Version.findAll({where: articleId});
	}

	static async create({title, content, attachments = [], workspaceId, authorId}) {
		if (!title?.trim() || !content?.trim()) {
			throw new Error("Title and content are required");
		}

		return await sequelize.transaction(async t => {
			const article = await Article.create({workspaceId, authorId});

			const version = await VersionService.create({
				title,
				content,
				attachments,
				authorId,
				articleId: article.id,
			});

			return await Article.findByPk(article.id, {
				include: [
					{
						model: Version,
						as: "versions",
						where: {isLatest: true},
						required: false,
						include: [
							{
								model: Attachment,
								as: "attachments",
								through: {attributes: []},
							},
						],
					},
				],
			});
		});
	}

	static async update({articleId, authorId, title, content, attachments = []}) {
		const article = await Article.findByPk(articleId);
		if (!article) return null;

		return await VersionService.create({
			articleId,
			authorId,
			title,
			content,
			attachments,
		});
	}

	static async delete(id) {
		return sequelize.transaction(async t => {
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
