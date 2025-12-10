const WorkspaceService = require("../services/workspace.service");

/**
 * @swagger
 * /workspaces:
 *   get:
 *     summary: Get all workspaces
 *     tags: [Workspaces]
 *     responses:
 *       200:
 *         description: List of all workspaces
 */
exports.getAll = async (req, res) => {
	const workspaces = await WorkspaceService.getAll();
	res.status(200).json(workspaces);
};

/**
 * @swagger
 * /workspaces/{id}:
 *   get:
 *     summary: Get a workspace by ID
 *     tags: [Workspaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workspace found
 *       404:
 *         description: Workspace not found
 */
exports.getById = async (req, res) => {
	const workspace = await WorkspaceService.getById(req.params.id);

	if (!workspace) {
		return res.status(404).json({error: "Workspace not found"});
	}

	res.status(200).json(workspace);
};

/**
 * @swagger
 * /workspaces:
 *   post:
 *     summary: Create a new workspace
 *     tags: [Workspaces]
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
 *                 example: "Marketing"
 *     responses:
 *       201:
 *         description: Workspace created
 *       400:
 *         description: Invalid data
 */
exports.create = async (req, res) => {
	try {
		const {name} = req.body;

		const workspace = await WorkspaceService.create(name);
		res.status(201).json(workspace);
	} catch (err) {
		res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /workspaces:
 *   put:
 *     summary: Update a workspace
 *     tags: [Workspaces]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "b5c23796-f8c7-4e15-9f6d-7f14cbc01460"
 *               name:
 *                 type: string
 *                 example: "Updated Workspace Name"
 *     responses:
 *       200:
 *         description: Workspace updated
 *       404:
 *         description: Workspace not found
 */
exports.update = async (req, res) => {
	try {
		const {id, name} = req.body;

		const updated = await WorkspaceService.update({
			id,
			name,
		});

		if (!updated) return res.status(404).json({error: "Workspace not found"});

		res.status(200).json(updated);
	} catch (err) {
		res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /workspaces/{id}:
 *   delete:
 *     summary: Delete a workspace
 *     tags: [Workspaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workspace deleted
 *       404:
 *         description: Workspace not found
 */
exports.delete = async (req, res) => {
	try {
		const deleted = await WorkspaceService.delete(req.params.id);

		if (!deleted) {
			return res.status(404).json({error: "Workspace not found"});
		}

		res.status(200).json({message: "Workspace deleted successfully"});
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};
