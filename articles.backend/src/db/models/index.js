const sequelize = require("../sequelize")
const DataTypes = require("sequelize")
const Article = require("./article")(sequelize, DataTypes);
const Attachment = require("./attachment")(sequelize, DataTypes);
const ArticleAttachment = require("./articleattachment")(sequelize, DataTypes);


const models = {Article, Attachment, ArticleAttachment};

Object.values(models).forEach(model => {
	if (model.associate) {
		model.associate(models);
	}
});

module.exports = {
	sequelize,
	Article,
	Attachment,
	ArticleAttachment,
};
