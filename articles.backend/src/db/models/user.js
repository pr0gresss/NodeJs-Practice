"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			this.hasMany(models.Version, {
				foreignKey: "authorId",
				as: "versions",
			});
			
			this.hasMany(models.Comment, {
				foreignKey: "authorId",
				as: "comments",
			});
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			email: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
