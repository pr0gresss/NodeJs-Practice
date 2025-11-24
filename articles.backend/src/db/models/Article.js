const sequelize = require("../sequelize");

class Article extends Model {}

Article.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Article",
		tableName: "articles",
		timestamps: true,
	}
);

module.exports = Article;