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
		}
	}
	Article.init(
		{
			id: {
				type: DataTypes.UUID, 
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
			},
			title: DataTypes.STRING,
			content: DataTypes.STRING,
		},
		{
			sequelize,
			timestamps: true,
			modelName: "Article",
		}
	);
	return Article;
};
