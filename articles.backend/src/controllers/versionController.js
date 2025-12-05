const VersionService = require("../services/versionService");

/**
 * @swagger
 * /version/{versionId}:
 *   get:
 *     summary: Get a version by ID
 *     tags: [Versions]
 *     parameters:
 *       - in: path
 *         name: versionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Version found
 *       404:
 *         description: Version not found
 */
exports.getVersionById = async (req, res) => {
	try {
		const version = await VersionService.getVersionById(req.params.versionId);

		if (!version) {
			return res.status(404).json({error: "Version not found"});
		}

		res.status(200).json(version);
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};

/**
 * @swagger
 * /versions/{articleId}:
 *   get:
 *     summary: Get all versions for an article
 *     tags: [Versions]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         description: Article ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of versions
 *       404:
 *         description: No versions found
 */
exports.getVersionsByArticleId = async (req, res) => {
	try {
		const versions = await VersionService.getVersionsByArticleId(
			req.params.articleId
		);

		if (!versions || versions.length === 0) {
			return res.status(404).json({error: "No versions found"});
		}

		res.status(200).json(versions);
	} catch (err) {
		res.status(500).json({error: err.message});
	}
};
