const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User, Role} = require("../db/models");

const SALT_ROUNDS = 10;

class AuthService {
	static async getMe(token) {
		if (!token) {
			throw new Error("Token is required");
		}

		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			throw new Error("Invalid or expired token");
		}

		const user = await User.findByPk(decoded.id, {
			attributes: ["id", "email"],
		});

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	}

	static async signUp(email, password) {
		const existingUser = await User.findOne({where: {email}});
		if (existingUser) {
			throw new Error("User already exists");
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const userRole = await Role.findOne({where: {name: "User"}});

		const user = await User.create({
			email,
			password: hashedPassword,
			roleId: userRole.id,
		});

		const token = jwt.sign(
			{id: user.id, email: user.email, roleId: user.roleId},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN,
			}
		);

		return {user, token};
	}

	static async signIn(email, password) {
		const user = await User.findOne({where: {email}});
		if (!user) {
			throw new Error("Invalid credentials");
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			throw new Error("Invalid credentials");
		}

		const token = jwt.sign(
			{id: user.id, email: user.email, roleId: user.roleId},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN,
			}
		);

		return {user, token};
	}
}

module.exports = AuthService;
