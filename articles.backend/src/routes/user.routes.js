const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/users").get(authMiddleware, userController.getAll);
router.route("/users/:userId").get(authMiddleware, userController.getById);

module.exports = router;
