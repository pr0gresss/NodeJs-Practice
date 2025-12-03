const {
	sequelize,
	Version,
	Attachment,
	VersionAttachment,
} = require("../db/models");

class VersionService {
	static async getVersionById(versionId) {
		return await Version.findByPk(versionId, {
			include: [
				{
					model: Attachment,
					as: "attachments",
					through: {attributes: []},
				},
			],
		});
	}

	static async getVersionsByArticleId(articleId) {
		return await Version.findAll({
			where: {articleId},
			order: [["createdAt", "DESC"]],
			include: [
				{
					model: Attachment,
					as: "attachments",
					through: {attributes: []},
				},
			],
		});
	}

	static async create({articleId, content, title, attachments = []}) {
		if (!content?.trim() || !title?.trim()) {
			throw new Error("Title and content are required");
		}

		return await sequelize.transaction(async t => {
			await Version.update(
				{isLatest: false},
				{where: {articleId}, transaction: t}
			);

			const version = await Version.create(
				{
					articleId,
					title: title.trim(),
					content: content.trim(),
					isLatest: true,
				},
				{transaction: t}
			);

			if (attachments.length) {
				await VersionAttachment.bulkCreate(
					attachments.map(a => ({
						versionId: version.id,
						attachmentId: a.id,
					})),
					{transaction: t}
				);
			}

			// Reload version WITH attachments
			const fullVersion = await Version.findByPk(version.id, {
				transaction: t,
				include: [
					{
						model: Attachment,
						as: "attachments",
						through: {attributes: []},
					},
				],
			});

			return fullVersion;
		});
	}
}

module.exports = VersionService;
