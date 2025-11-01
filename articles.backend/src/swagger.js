const swaggerJSDoc = require('swagger-jsdoc');

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
				url: 'http://localhost:3000',
			},
		],
	},
	apis: ['./src/controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
