const express = require("express");
const router = express.Router();
const versionController = require("../controllers/version.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
	"/versions/:articleId",
	authMiddleware,
	versionController.getVersionsByArticleId
);
router.get(
	"/version/:versionId",
	authMiddleware,
	versionController.getVersionById
);

module.exports = router;
