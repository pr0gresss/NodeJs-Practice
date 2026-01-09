const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");

router
	.route("/roles")
	.get(roleController.getAll)
	.post(roleController.create);
router
	.route("/roles/:id")
	.get(roleController.getById)
	.delete(roleController.delete);

module.exports = router;
