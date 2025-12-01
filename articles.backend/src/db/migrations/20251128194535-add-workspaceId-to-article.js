"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Articles", "workspaceId", {
			type: Sequelize.UUID,
			allowNull: true,
			references: {
				model: "Workspaces",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "RESTRICT",
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn("Articles", "workspaceId");
	},
};
