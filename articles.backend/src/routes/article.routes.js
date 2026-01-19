const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article.controller");
const authMiddleware = require("../middleware/authMiddleware");
const articleAuthorMiddleware = require("../middleware/articleAuthorMiddleware");

router
	.route("/articles/workspace/:workspaceId")
	.get(authMiddleware, articleController.getByWorkspaceId);
router
	.route("/articles/attachments")
	.post(authMiddleware, articleController.uploadAttachment);

router
	.route("/articles/search")
	.get(authMiddleware, articleController.search);

router.route("/articles/:id/export/pdf").get(articleController.exportPdf)

router
	.route("/articles/:id")
	.get(authMiddleware, articleController.getById)
	.delete(authMiddleware, articleAuthorMiddleware, articleController.delete);

router
	.route("/articles")
	.post(authMiddleware, articleController.create)
	.get(authMiddleware, articleController.getAll)
	.put(authMiddleware, articleAuthorMiddleware, articleController.update);

module.exports = router;
