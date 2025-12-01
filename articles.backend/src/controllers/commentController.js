const CommentService = require("../services/commentService");

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments
 */
exports.getAll = async (req, res) => {
	try {
		const comments = await CommentService.getAll();
		res.status(200).json(comments);
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

/**
 * @swagger
 * /comments/{articleId}:
 *   get:
 *     summary: Get all comments for a specific article
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         schema:
 *           type: string
 *         required: true
 *         description: Article ID
 *     responses:
 *       200:
 *         description: List of comments for the article
 *       404:
 *         description: No comments found
 */
exports.getByArticleId = async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await CommentService.getByArticleId(articleId);
    if (!comments || comments.length === 0) {
      return res.status(404).json({ error: "No comments found for this article" });
    }

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a comment for an article
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               articleId:
 *                 type: string
 *                 example: "25e74169-3198-4b09-ac44-c3ae680f8bcd"
 *               content:
 *                 type: string
 *                 example: "This article changed my life or whatever."
 *     responses:
 *       201:
 *         description: Comment created
 */
exports.create = async (req, res) => {
  try {
    const { articleId, content } = req.body;

    const comment = await CommentService.create({ articleId, content });

    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /comments:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "c47ebdbc-1fb4-4cf5-93ae-b97dfeba5f21"
 *               content:
 *                 type: string
 *                 example: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment updated
 *       404:
 *         description: Comment not found
 */
exports.update = async (req, res) => {
	try {
		const {id, content} = req.body;

		const updated = await CommentService.update({id, content});

		if (!updated) {
			return res.status(404).json({error: "Comment not found"});
		}

		res.status(200).json(updated);
	} catch (err) {
		res.status(400).json({error: err.message});
	}
};

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       404:
 *         description: Comment not found
 */
exports.delete = async (req, res) => {
	try {
		const {id} = req.params;

		const deleted = await CommentService.delete(id);

		if (!deleted) {
			return res.status(404).json({error: "Comment not found"});
		}

		res.status(200).json({message: "Comment deleted"});
	} catch (err) {
		res.status(400).json({error: err.message});
	}
};
