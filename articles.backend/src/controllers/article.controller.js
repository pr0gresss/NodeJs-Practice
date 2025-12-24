const ArticleService = require("../services/article.service");
const SocketService = require("../services/socket.service");
const upload = require("../middleware/upload");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * components:
 *   schemas:
 *     Attachment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         filename:
 *           type: string
 *         url:
 *           type: string
 *         mimetype:
 *           type: string
 *         size:
 *           type: number
 *         uploadedAt:
 *           type: string
 *
 *     Version:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         isLatest:
 *           type: boolean
 *         attachments:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Attachment"
 *
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         workspaceId:
 *           type: string
 *         versions:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Version"
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Article"
 */
exports.getAll = async (req, res) => {
	try {
		const articles = await ArticleService.getAll();
		return res.status(200).json(articles);
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Article"
 *       404:
 *         description: Article not found
 */
exports.getById = async (req, res) => {
	try {
		const article = await ArticleService.getById(req.params.id);

		if (!article) {
			return res.status(404).json({error: "Article not found"});
		}

		return res.status(200).json(article);
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /articles/workspace/{workspaceId}:
 *   get:
 *     summary: Get articles by Workspace ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Articles for that workspace
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Article"
 */
exports.getByWorkspaceId = async (req, res) => {
	try {
		const workspaceId = req.params.workspaceId;
		const articles = await ArticleService.getByWorkspaceId(workspaceId);

		return res.status(200).json(articles);
	} catch (err) {
		return res.status(500).json({error: err.message});
	}
};

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article + latest version
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - workspaceId
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               workspaceId:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Attachment"
 *     responses:
 *       201:
 *         description: Article created
 *       400:
 *         description: Invalid request
 */
exports.create = async (req, res) => {
	try {
		const {title, workspaceId, content, attachments = []} = req.body;

		const article = await ArticleService.create({
			title,
			workspaceId,
			content,
			authorId: req.user.id,
			attachments,
		});

		return res.status(201).json(article);
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /articles:
 *   put:
 *     summary: Update article (creates a new version)
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - content
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Attachment"
 *               authorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated article
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Article not found
 */
exports.update = async (req, res) => {
	try {
		const {
			articleId,
			title,
			content,
			attachments = [],
			authorSocketId,
		} = req.body;

		const updated = await ArticleService.update({
			articleId,
			title,
			authorId: req.user.id,
			content,
			attachments,
		});

		if (!updated) return res.status(404).json({error: "Article not found"});

		SocketService.broadcastToRoomExceptAuthor(
			updated.articleId,
			"articleUpdated",
			updated,
			authorSocketId
		);

		return res.status(200).json(updated);
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article deleted
 *       404:
 *         description: Article not found
 */
exports.delete = async (req, res) => {
	try {
		const {id} = req.params;

		const deleted = await ArticleService.delete(id);

		if (!deleted) return res.status(404).json({error: "Article not found"});

		return res.status(200).json({message: "Article deleted successfully"});
	} catch (err) {
		return res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /articles/attachments:
 *   post:
 *     summary: Upload an attachment file
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded attachment metadata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Attachment"
 *       400:
 *         description: No file or invalid request
 *       406:
 *         description: Invalid file type
 */
exports.uploadAttachment = (req, res) => {
	upload.single("file")(req, res, async err => {
		if (err) {
			return res.status(err.status || 400).json({
				error: err.message,
			});
		}

		if (!req.file) {
			return res.status(400).json({
				error: "No file provided.",
			});
		}

		try {
			const attachment = await ArticleService.uploadAttachment(req.file);
			return res.status(200).json(attachment);
		} catch (err) {
			return res.status(400).json({error: err.message});
		}
	});
};
