const swaggerJSDoc = require('swagger-jsdoc');
const {BASE_URL} = require("./environment");

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Articles API',
			version: '1.0.0',
			description: 'Simple Express API for managing articles',
		},
		servers: [
			{
				url: BASE_URL,
			},
		],
	},
	apis: ['./src/controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
