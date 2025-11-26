const FRONTEND_HOST = process.env.FRONTEND_HOST || "http://localhost";
const FRONTEND_PORT = process.env.FRONTEND_PORT || 4200;
const FRONTEND_URL = `${FRONTEND_HOST}:${FRONTEND_PORT}`;

const BASE_HOST = process.env.BASE_HOST || "http://localhost";
const BASE_PORT = process.env.BASE_PORT || 3000;
const BASE_URL = `${BASE_HOST}:${BASE_PORT}`;

const SWAGGER_ENDPOINT = process.env.SWAGGER_ENDPOINT || "docs";

module.exports = {
	FRONTEND_HOST,
	FRONTEND_PORT,
	FRONTEND_URL,
	BASE_HOST,
	BASE_PORT,
	BASE_URL,
	SWAGGER_ENDPOINT,
};
