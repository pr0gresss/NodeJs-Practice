"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		static associate(models) {
			this.hasMany(models.User, {
				as: "users",
				foreignKey: "roleId",
			});
		}
	}
	Role.init(
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
			modelName: "Role",
		}
	);
	return Role;
};
