"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Articles", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			workspaceId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Workspaces",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			authorId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Articles");
	},
};
