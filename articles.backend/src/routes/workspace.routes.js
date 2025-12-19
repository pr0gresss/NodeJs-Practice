const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspace.controller");

router
	.route("/workspaces")
	.post(workspaceController.create)
	.put(workspaceController.update)
	.get(workspaceController.getAll);

router
	.route("/workspaces/:id")
	.get(workspaceController.getById)
	.delete(workspaceController.delete);

module.exports = router;
