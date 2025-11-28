"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ArticleAttachments", {
			articleId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Articles",
					key: "id",
				},
			},
			attachmentId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Attachments",
					key: "id",
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("ArticleAttachments");
	},
};
