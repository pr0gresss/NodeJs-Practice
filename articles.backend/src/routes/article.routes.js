const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article.controller");
const authMiddleware = require("../middleware/authMiddleware");
const articleAuthorMiddleware = require("../middleware/articleAuthorMiddleware");

router.get(
	"/articles/workspace/:workspaceId",
	authMiddleware,
	articleController.getByWorkspaceId
);
router.post(
	"/articles/attachments",
	authMiddleware,
	articleController.uploadAttachment
);

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
