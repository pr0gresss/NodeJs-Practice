const RoleService = require("../services/role.service");

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Role"
 */
exports.getAll = async (req, res) => {
	try {
		const roles = await RoleService.getAll();
		return res.status(200).json(roles);
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Role found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Role"
 *       404:
 *         description: Role not found
 */
exports.getById = async (req, res) => {
	try {
		const role = await RoleService.getById(req.params.id);

		if (!role) {
			return res.status(404).json({error: "Role not found"});
		}

		return res.status(200).json(role);
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Role"
 *       400:
 *         description: Invalid request
 */
exports.create = async (req, res) => {
	try {
		const {name} = req.body;

		const role = await RoleService.create(name);
		return res.status(201).json(role);
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Role deleted
 *       404:
 *         description: Role not found
 */
exports.delete = async (req, res) => {
	try {
		const deleted = await RoleService.delete(req.params.id);

		if (!deleted) {
			return res.status(404).json({error: "Role not found"});
		}

		return res.status(200).json({message: "Role deleted successfully"});
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};
