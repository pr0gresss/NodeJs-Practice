const databaseConfig = require("../config/database");
const {Sequelize} = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = databaseConfig[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
	port: config.port,
	host: config.host,
	dialect: "postgres",
	logging: false,
});

module.exports = sequelize;
