"use strict";

const bcrypt = require("bcrypt");
const {v4: uuidv4} = require("uuid");

module.exports = {
	async up(queryInterface) {
		// find Admin role
		const [roles] = await queryInterface.sequelize.query(
			`SELECT id FROM "Roles" WHERE name = 'Admin' LIMIT 1;`
		);

		if (!roles.length) {
			throw new Error("Admin role not found. Seeder aborted.");
		}

		const adminRoleId = roles[0].id;

		const hashedPassword = await bcrypt.hash("admin123", 10);

		await queryInterface.bulkInsert("Users", [
			{
				id: uuidv4(),
				email: "admin@admin.lt",
				password: hashedPassword,
				roleId: adminRoleId,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete("Users", {
			email: "admin",
		});
	},
};
