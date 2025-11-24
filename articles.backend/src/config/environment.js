const FRONTEND_HOST = process.env.FRONTEND_HOST;
const FRONTEND_PORT = process.env.FRONTEND_PORT;
const FRONTEND_URL = `${FRONTEND_HOST}:${FRONTEND_PORT}`;

const BASE_HOST = process.env.BASE_HOST;
const BASE_PORT = process.env.BASE_PORT;
const BASE_URL = `${BASE_HOST}:${BASE_PORT}`;

const SWAGGER_ENDPOINT = process.env.SWAGGER_ENDPOINT;

module.exports = {
	FRONTEND_HOST,
	FRONTEND_PORT,
	FRONTEND_URL,
	BASE_HOST,
	BASE_PORT,
	BASE_URL,
	SWAGGER_ENDPOINT,
};
