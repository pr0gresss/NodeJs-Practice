const config = require("../config/database")
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(config.database, config.user, config.password, {
	port: config.port,
	host: config.host,
	dialect: "postgres",
	logging: false,
});

module.exports = sequelize;
