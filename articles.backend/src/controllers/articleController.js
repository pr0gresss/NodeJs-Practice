const ArticleService = require('../services/articleService');

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     responses:
 *       200:
 *         description: A list of articles
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
 */
exports.getAll = (req, res) => {
	const articles = ArticleService.getAll();
	res.status(200).json(articles);
};

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The article
 *       404:
 *         description: Article not found
 */
exports.getById = (req, res) => {
	const article = ArticleService.getById(req.params.id);
	if (!article) return res.status(404).json({ error: 'Article not found' });
	res.status(200).json(article);
};

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article created
 *       400:
 *         description: Invalid input
 */
exports.create = (req, res) => {
	try {
		const article = ArticleService.create(req.body);
		res.status(201).json(article);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

/**
 * @swagger
 * /articles:
 *   put:
 *     summary: Update an existing article
 *     description: Updates an article using its ID from the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: string
 *                 example: "1729963452001"
 *               title:
 *                 type: string
 *                 example: "Updated title"
 *               content:
 *                 type: string
 *                 example: "<p>Updated content</p>"
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Article not found
 */
exports.update = (req, res) => {
	try {
		const updated = ArticleService.update(req.body); // ✅ pass full article

		if (!updated) {
			return res.status(404).json({ error: 'Article not found' });
		}

		res.status(200).json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete an article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "1730293939"
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 */
exports.delete = (req, res) => {
  try {
    const { id } = req.params; // ✅ get ID from route

    const deleted = ArticleService.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
