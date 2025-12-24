const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspace.controller");
const authMiddleware = require("../middleware/authMiddleware");

router
	.route("/workspaces")
	.post(authMiddleware, workspaceController.create)
	.put(authMiddleware, workspaceController.update)
	.get(authMiddleware, workspaceController.getAll);

router
	.route("/workspaces/:id")
	.get(authMiddleware, workspaceController.getById)
	.delete(authMiddleware, workspaceController.delete);

module.exports = router;
