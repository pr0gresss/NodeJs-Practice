const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");

router.get("/comments/:articleId", commentController.getByArticleId);
router.delete("/comments/:id", commentController.delete);

router
	.route("/comments")
	.post(commentController.create)
	.put(commentController.update)
	.get(commentController.getAll);

module.exports = router;
