"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Article extends Model {
		static associate(models) {
			this.belongsToMany(models.Attachment, {
				as: "attachments",
				through: models.ArticleAttachment,
				foreignKey: "articleId",
				otherKey: "attachmentId",
			});
			this.belongsTo(models.Workspace, {
				foreignKey: "workspaceId",
				as: "workspace",
			});
			this.hasMany(models.Comment, {
				as: "comments",
				foreignKey: "articleId",
				onDelete: "CASCADE",
			});
		}
	}
	Article.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
			},
			title: DataTypes.STRING,
			content: DataTypes.STRING,
			workspaceId: {
				allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: "Workspaces",
					key: "id",
				},
			},
		},
		{
			sequelize,
			timestamps: true,
			modelName: "Article",
		}
	);
	return Article;
};
