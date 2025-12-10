const {Workspace} = require("../db/models");

class WorkspaceService {
	static async getAll() {
		return Workspace.findAll();
	}

	static async getById(id) {
		return Workspace.findByPk(id);
	}

	static async create(name) {
		return Workspace.create({name});
	}

	static async update({id, name}) {
		const workspace = await Workspace.findByPk(id);
		if (!workspace) return null;

		return workspace.update({name});
	}

	static async delete(id) {
		const workspace = await Workspace.findByPk(id);
		if (!workspace) return null;

		await workspace.destroy();
		return true;
	}
}

module.exports = WorkspaceService;
