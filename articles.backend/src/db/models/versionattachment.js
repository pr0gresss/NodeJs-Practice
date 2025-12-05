"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class VersionAttachment extends Model {
		static associate(models) {}
	}
	VersionAttachment.init(
		{
			versionId: DataTypes.UUID,
			attachmentId: DataTypes.UUID,
		},
		{
			sequelize,
			timestamps: false,
			modelName: "VersionAttachment",
		}
	);
	return VersionAttachment;
};
