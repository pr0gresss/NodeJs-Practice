const express = require("express");
const router = express.Router();
const versionController = require("../controllers/versionController");

router.get("/versions/:articleId", versionController.getVersionsByArticleId);
router.get("/version/:versionId", versionController.getVersionById);

module.exports = router;
