"use strict";

const {v4: uuidv4} = require("uuid");

module.exports = {
	async up(queryInterface) {
		const now = new Date();

		await queryInterface.bulkInsert(
			"Roles",
			[
				{
					id: uuidv4(),
					name: "User",
					createdAt: now,
					updatedAt: now,
				},
				{
					id: uuidv4(),
					name: "Admin",
					createdAt: now,
					updatedAt: now,
				},
			],
			{
				ignoreDuplicates: true,
			}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("Roles", {
			name: ["User", "Admin"],
		});
	},
};
