const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
	"/comments/:articleId",
	authMiddleware,
	commentController.getByArticleId
);
router.delete(
	"/comments/:id",
	authMiddleware,
	commentController.delete
);

router
	.route("/comments")
	.post(authMiddleware, commentController.create)
	.put(authMiddleware, commentController.update)
	.get(authMiddleware, commentController.getAll);

module.exports = router;
