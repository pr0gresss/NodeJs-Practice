"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Version extends Model {
		static associate(models) {
			this.belongsTo(models.Article, {
				foreignKey: "articleId",
				as: "article",
			});

			this.belongsToMany(models.Attachment, {
				as: "attachments",
				through: models.VersionAttachment,
				foreignKey: "versionId",
				otherKey: "attachmentId",
				onDelete: "CASCADE"
			});
		}
	}
	Version.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
			},
			content: DataTypes.STRING,
			title: DataTypes.STRING,
			isLatest: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			timestamps: true,
			modelName: "Version",
		}
	);
	return Version;
};
