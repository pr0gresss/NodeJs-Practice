"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Versions", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			articleId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Articles",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			isLatest: {
				type: Sequelize.BOOLEAN,
			},
			title: {
				type: Sequelize.STRING,
			},
			content: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("Versions");
	},
};
