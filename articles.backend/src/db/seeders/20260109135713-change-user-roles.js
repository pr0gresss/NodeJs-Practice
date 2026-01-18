"use strict";

module.exports = {
	async up(queryInterface) {
		const [roles] = await queryInterface.sequelize.query(
			`SELECT id FROM "Roles" WHERE name = 'User' LIMIT 1;`
		);

		if (!roles.length) {
			throw new Error("User role not found. Seeder aborted.");
		}

		const userRoleId = roles[0].id;

		await queryInterface.sequelize.query(
			`
      UPDATE "Users"
      SET "roleId" = :roleId
      WHERE "roleId" IS NULL
      `,
			{
				replacements: {roleId: userRoleId},
			}
		);
	},

	async down() {},
};
