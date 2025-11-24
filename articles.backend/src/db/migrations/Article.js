"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("articles", {
			id: {
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			content: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable("articles");
	},
};
