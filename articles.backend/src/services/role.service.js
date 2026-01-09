const {where} = require("sequelize");
const {Role} = require("../db/models");

class RoleService {
	static async getAll() {
		return await Role.findAll();
	}

	static async getById(id) {
		return await Role.findByPk(id);
	}

	static async create(name) {
		return await Role.create({name});
	}

	static async delete(id) {
		const role = await Role.findByPk(id);
		if (!role) return null;

		await role.destroy();
		return true;
	}
}

module.exports = RoleService;
