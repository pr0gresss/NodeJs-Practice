"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			this.hasMany(models.Version, {
				foreignKey: "authorId",
				as: "versions",
			});

			this.belongsTo(models.Role, {
				foreignKey: "roleId",
				as: "role",
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
			roleId: {
				type: DataTypes.UUID,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
