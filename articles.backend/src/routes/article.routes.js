const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article.controller");
const authMiddleware = require("../middleware/authMiddleware");

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
	.delete(authMiddleware, articleController.delete);

router
	.route("/articles")
	.post(authMiddleware, articleController.create)
	.get(authMiddleware, articleController.getAll)
	.put(authMiddleware, articleController.update);

module.exports = router;
