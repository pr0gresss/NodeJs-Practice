const ArticleService = require("../services/articleService");
const SocketService = require("../services/socketService");
const upload = require("../middleware/upload");

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: A list of all articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   attachments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         filename:
 *                           type: string
 *                         url:
 *                           type: string
 *                         uploadedAt:
 *                           type: string
 */
exports.getAll = async (req, res) => {
	const articles = await ArticleService.getAll();
	res.status(200).json(articles);
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
 *         description: The article ID
 *     responses:
 *       200:
 *         description: Article found
 *       404:
 *         description: Article not found
 */
exports.getById = async (req, res) => {
	const article = await ArticleService.getById(req.params.id);
	if (!article) return res.status(404).json({error: "Article not found"});
	res.status(200).json(article);
};

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My first article"
 *               content:
 *                 type: string
 *                 example: "<p>This is HTML content</p>"
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                     url:
 *                       type: string
 *     responses:
 *       201:
 *         description: Article created successfully
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
			attachments,
		});

		res.status(201).json(article);
	} catch (err) {
		res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /articles:
 *   put:
 *     summary: Update an existing article
 *     tags: [Articles]
 *     description: Update article details and attachments.
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
 *                 example: "1730505050000"
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               content:
 *                 type: string
 *                 example: "<p>Updated HTML content</p>"
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                     url:
 *                       type: string
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Article not found
 */
exports.update = async (req, res) => {
	try {
		const {id, title, content, attachments = [], authorId} = req.body;

		const updated = await ArticleService.update({
			id,
			title,
			content,
			attachments,
		});

		if (!updated) return res.status(404).json({error: "Article not found"});

		SocketService.broadcastToRoomExceptAuthor(
			updated.id,
			"articleUpdated",
			updated,
			authorId
		);

		res.status(200).json(updated);
	} catch (err) {
		res.status(400).json({error: err.message});
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
 *         description: ID of the article to delete
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 */
exports.delete = async (req, res) => {
	try {
		const {id} = req.params;

		const deleted = await ArticleService.delete(id);

		if (!deleted) return res.status(404).json({error: "Article not found"});

		res.status(200).json({message: "Article deleted successfully"});
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

/**
 * @swagger
 * /articles/attachments:
 *   post:
 *     summary: Upload an attachment file
 *     tags: [Articles]
 *     description: Uploads a single file and returns attachment metadata.
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
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filename:
 *                   type: string
 *                 url:
 *                   type: string
 *                 mimetype:
 *                   type: string
 *                 size:
 *                   type: number
 *                 uploadedAt:
 *                   type: string
 *       400:
 *         description: No file provided or invalid request
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
			return res.status(400).json({
				error: err.message,
			});
		}
	});
};
