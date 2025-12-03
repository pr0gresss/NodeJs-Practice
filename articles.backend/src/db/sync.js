const sequelize = require("./sequelize");

sequelize
	.sync({alter: false})
	.then(() => console.log("Database synced"))
	.catch(err => console.error(err));
