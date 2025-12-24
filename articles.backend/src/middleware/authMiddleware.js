const jwt = require("jsonwebtoken");
const {User} = require("../db/models");

module.exports = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({error: "Authorization header missing"});
		}

		const [type, token] = authHeader.split(" ");

		if (type !== "Bearer" || !token) {
			return res.status(401).json({error: "Invalid authorization format"});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findByPk(decoded.id);
		if (!user) {
			return res.status(401).json({error: "User not found"});
		}

		req.user = {
			id: user.id,
			email: user.email,
		};

		next();
	} catch (err) {
		return res.status(401).json({error: "Unauthorized"});
	}
};
