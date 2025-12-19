const {User} = require("../db/models");

class UserService {
	static async getAll() {
		return await User.findAll({attributes: {exclude: ["password"]}});
	}

	static async getById(id) {
		return await User.findByPk(id, {
			attributes: {exclude: ["password"]},
		});
	}
}

module.exports = UserService;
