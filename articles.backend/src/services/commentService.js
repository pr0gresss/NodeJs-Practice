const {Comment} = require("../db/models");

class CommentService {
	static async getAll() {
		return Comment.findAll();
	}

	static async getByArticleId(articleId) {
		return Comment.findAll({where: {articleId}});
	}

	static async create({articleId, content}) {
		return Comment.create({articleId, content});
	}

	static async update({id, content}) {
		const comment = await Comment.findByPk(id);
		if (!comment) return null;

		return comment.update({content});
	}

	static async delete(id) {
		const comment = await Comment.findByPk(id);
		if (!comment) return null;

		await comment.destroy();
		return true;
	}
}

module.exports = CommentService;
