"use strict";
const {randomUUID} = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const [rows] = await queryInterface.sequelize.query(
			`SELECT id FROM "Workspaces" WHERE name = 'General' LIMIT 1;`
		);

		if (!rows || rows.length === 0) {
			await queryInterface.bulkInsert("Workspaces", [
				{
					id: randomUUID(),
					name: "General",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Workspaces", {name: "General"});
	},
};
