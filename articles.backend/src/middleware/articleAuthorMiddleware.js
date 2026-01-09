const {Article, Role} = require("../db/models");

module.exports = async (req, res, next) => {
	try {
		const {user} = req;
		const articleId = req.body.articleId || req.params.id;

		if (!articleId) {
			return res.status(400).json({error: "Article ID is required"});
		}

		const article = await Article.findByPk(articleId);

		if (!article) {
			return res.status(404).json({error: "Article not found"});
		}

		if (article.authorId === user.id) {
			return next();
		}

		const role = await Role.findByPk(user.roleId);
		if (role && role.name === "Admin") {
			return next();
		}

		return res.status(403).json({
			error: "You are not allowed to modify this article",
		});
	} catch (err) {
		return res.status(500).json({error: "Authorization failed"});
	}
};
