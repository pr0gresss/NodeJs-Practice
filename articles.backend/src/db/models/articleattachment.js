"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ArticleAttachment extends Model {
		static associate(models) {}
	}
	ArticleAttachment.init(
		{
			articleId: DataTypes.UUID,
			attachmentId: DataTypes.UUID,
		},
		{
			sequelize,
			timestamps: false,
			modelName: "ArticleAttachment",
		}
	);
	return ArticleAttachment;
};
