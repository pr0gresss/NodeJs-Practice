const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const upload = require("../middleware/upload");

router.post("/articles", articleController.create);
router.put("/articles", articleController.update);
router.get("/articles", articleController.getAll);
router.get("/articles/:id", articleController.getById);
router.delete("/articles/:id", articleController.delete);
router.post("/articles/attachments", articleController.uploadAttachment);

module.exports = router;
