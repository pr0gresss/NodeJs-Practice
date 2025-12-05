"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("VersionAttachments", {
			versionId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Versions",
					key: "id",
				},
				onDelete: "CASCADE"
			},
			attachmentId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "Attachments",
					key: "id",
				},
				onDelete: "CASCADE"
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("VersionAttachments");
	},
};
