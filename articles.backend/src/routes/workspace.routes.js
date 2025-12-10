const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspace.controller");

router.post("/workspaces", workspaceController.create);
router.put("/workspaces", workspaceController.update);
router.get("/workspaces", workspaceController.getAll);
router.get("/workspaces/:id", workspaceController.getById);
router.delete("/workspaces/:id", workspaceController.delete);

module.exports = router;
