"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Workspace extends Model {
		static associate(models) {
			this.belongsToMany(models.Article, {
				as: "article",
				foreignKey: "workspaceId",
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
			modelName: "Workspace",
		}
	);
	return Workspace;
};
