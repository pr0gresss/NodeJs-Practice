"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Attachment extends Model {
		static associate(models) {
			this.belongsToMany(models.Article, {
				as: "articles",
				through: models.ArticleAttachment,
				foreignKey: "attachmentId",
				otherKey: "articleId",
			});
		}
	}
	Attachment.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
			},
			filename: DataTypes.STRING,
			url: DataTypes.STRING,
			mimetype: DataTypes.STRING,
			size: DataTypes.INTEGER,
		},
		{
			sequelize,
			timestamps: true,
			modelName: "Attachment",
		}
	);
	return Attachment;
};
