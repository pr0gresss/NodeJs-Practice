const {Role} = require("../db/models");

module.exports = async (req, res, next) => {
	try {
		if (!req.user || !req.user.roleId) {
			return res.status(403).json({error: "Access denied"});
		}

		const role = await Role.findByPk(req.user.roleId);

		if (!role || role.name !== "Admin") {
			return res.status(403).json({error: "Admin access required"});
		}

		next();
	} catch (err) {
		return res.status(500).json({error: "Authorization failed"});
	}
};
