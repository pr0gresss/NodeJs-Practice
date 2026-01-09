const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router
	.route("/users")
	.get(authMiddleware, adminMiddleware, userController.getAll);
router
	.route("/users/:userId")
	.get(authMiddleware, userController.getById)
	.post(authMiddleware, adminMiddleware, userController.update);

module.exports = router;
