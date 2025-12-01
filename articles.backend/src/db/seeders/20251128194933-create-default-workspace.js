"use strict";
const {randomUUID} = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Workspaces", [
			{
				id: randomUUID(),
				name: "General",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Workspaces", {name: "General"});
	},
};
