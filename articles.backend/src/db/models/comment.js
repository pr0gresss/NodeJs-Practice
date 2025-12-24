"use strict";
const {Model, Sequelize} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {}
	}
	Comment.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
			},
			articleId: {
				allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: "Articles",
					key: "id",
				},
			},
			authorId: {
				allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: "Users",
					key: "id",
				},
			},
			content: DataTypes.STRING,
		},
		{
			sequelize,
			timestamps: true,
			modelName: "Comment",
		}
	);
	return Comment;
};
