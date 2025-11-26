require("dotenv").config();
const http = require("http");
const {app} = require("./app");
const {
	BASE_PORT,
	SWAGGER_ENDPOINT,
	FRONTEND_URL,
} = require("./config/environment");
const SocketService = require("./services/socketService");

const server = http.createServer(app);
SocketService.init(server, FRONTEND_URL);

server.listen(BASE_PORT, () => {
	console.log(`✅ Server running at http://localhost:${BASE_PORT}`);
	console.log(
		`📘 Swagger docs available at http://localhost:${BASE_PORT}/${SWAGGER_ENDPOINT}`
	);
});
