"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const [rows] = await queryInterface.sequelize.query(
			`SELECT id FROM "Workspaces" WHERE name = 'General' LIMIT 1;`
		);

		if (!rows || rows.length === 0) {
			throw new Error("Default workspace not found. Someone broke things.");
		}

		const defaultId = rows[0].id;

		await queryInterface.bulkUpdate(
			"Articles",
			{workspaceId: defaultId},
			{workspaceId: null}
		);
	},

	async down(queryInterface, Sequelize) {
		const [rows] = await queryInterface.sequelize.query(
			`SELECT id FROM "Workspaces" WHERE name = 'General' LIMIT 1;`
		);

		if (!rows || rows.length === 0) {
			throw new Error("Default workspace not found. Someone broke things.");
		}

		const defaultId = rows[0].id;

		await queryInterface.bulkUpdate(
			"Articles",
			{workspaceId: null},
			{workspaceId: defaultId}
		);
	},
};
