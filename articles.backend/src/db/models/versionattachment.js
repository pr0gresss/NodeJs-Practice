"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class VersionAttachment extends Model {
		static associate(models) {}
	}
	VersionAttachment.init(
		{
			versionId: {
				allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: "Versions",
					key: "id",
				}
			},
			attachmentId: {
				allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: "Attachments",
					key: "id",
				}
			},
		},
		{
			sequelize,
			timestamps: false,
			modelName: "VersionAttachment",
		}
	);
	return VersionAttachment;
};
