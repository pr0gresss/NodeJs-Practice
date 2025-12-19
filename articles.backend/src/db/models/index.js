const sequelize = require("../sequelize");
const {DataTypes} = require("sequelize");

const Article = require("./article")(sequelize, DataTypes);
const Attachment = require("./attachment")(sequelize, DataTypes);
const VersionAttachment = require("./versionattachment")(sequelize, DataTypes);
const Workspace = require("./workspace")(sequelize, DataTypes);
const Comment = require("./comment")(sequelize, DataTypes);
const Version = require("./version")(sequelize, DataTypes);
const User = require("./user")(sequelize, DataTypes);

const models = {
	Article,
	Attachment,
	VersionAttachment,
	Workspace,
	Comment,
	Version,
	User
};

Object.values(models).forEach(model => {
	if (model.associate) {
		model.associate(models);
	}
});

module.exports = {
	sequelize,
	...models,
};
