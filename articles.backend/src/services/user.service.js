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

	static async update({id, email, roleId}) {
		const user = await User.findByPk(id);
		if (!user) return null;

		await user.update({
			email,
			roleId,
		});

		const {password, ...safeUser} = user.get({plain: true});
		return safeUser;
	}
}

module.exports = UserService;
