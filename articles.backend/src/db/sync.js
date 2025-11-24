const sequelize = require("./sequelize");
require("./models/Article");

sequelize
	.sync({alter: false})
	.then(() => console.log("Database synced"))
	.catch(err => console.error(err));
