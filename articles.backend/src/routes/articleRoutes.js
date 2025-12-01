const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.post("/articles", articleController.create);
router.put("/articles", articleController.update);
router.get("/articles", articleController.getAll);
router.get("/articles/:id", articleController.getById);
router.delete("/articles/:id", articleController.delete);
router.get("/articles/workspace/:workspaceId", articleController.getByWorkspaceId);
router.post("/articles/attachments", articleController.uploadAttachment);

module.exports = router;
