"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Version extends Model {
		static associate(models) {
			this.belongsTo(models.Article, {
				foreignKey: "articleId",
				as: "article",
			});
			this.belongsTo(models.User, {
				foreignKey: "authorId",
				as: "author",
			});

			this.belongsToMany(models.Attachment, {
				as: "attachments",
				through: models.VersionAttachment,
				foreignKey: "versionId",
				otherKey: "attachmentId",
				onDelete: "CASCADE",
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
			authorId: {
				type: DataTypes.UUIDV4,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
			},
		},
		{
			sequelize,
			timestamps: true,
			modelName: "Version",
		}
	);
	return Version;
};
