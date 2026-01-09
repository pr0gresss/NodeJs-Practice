"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Users", "roleId", {
			type: Sequelize.UUID,
			allowNull: true,
			references: {
				model: "Roles",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn("Users", "roleId");
	},
};
