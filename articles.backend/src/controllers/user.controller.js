const UserService = require("../services/user.service");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64fa12c9e8c1a3b2d1e12345"
 *         name:
 *           type: string
 *           example: "Jane Doe"
 *         email:
 *           type: string
 *           example: "jane@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 */
exports.getAll = async (req, res) => {
	try {
		const users = await UserService.getAll();
		return res.status(200).json(users);
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: User not found
 */
exports.getById = async (req, res) => {
	try {
		const user = await UserService.getById(req.params.userId);
		if (!user) return res.status(404).json({error: "User not found"});
		return res.status(200).json(user);
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user (admin only)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *               email:
 *                 type: string
 *               roleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: User not found
 */
exports.update = async (req, res) => {
	try {
		const { id, email, roleId } = req.body;

		const updatedUser = await UserService.update({ id, email, roleId });
		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json(updatedUser);
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

