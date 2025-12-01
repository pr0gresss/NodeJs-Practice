const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/comments", commentController.create);
router.put("/comments", commentController.update);
router.get("/comments", commentController.getAll);
router.get("/comments/:articleId", commentController.getByArticleId);
router.delete("/comments/:id", commentController.delete);

module.exports = router;
