"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Workspace extends Model {
		static associate(models) {
			this.hasMany(models.Article, {
				foreignKey: "workspaceId",
				as: "articles",
				onDelete: "CASCADE"
			});
		}
	}
	Workspace.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
			},
			name: DataTypes.STRING,
		},
		{
			sequelize,
			timestamps: true,
			modelName: "Workspace",
		}
	);
	return Workspace;
};
