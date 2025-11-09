const http = require("http");
const {PORT, SWAGGER_URL, app, FRONTEND_URL} = require("./app");
const {initSocket} = require("./sockets/socket");

const server = http.createServer(app);

initSocket(server, FRONTEND_URL);

server.listen(PORT, () => {
	console.log(`✅ Server running at http://localhost:${PORT}`);
	console.log(
		`📘 Swagger docs available at http://localhost:${PORT}/${SWAGGER_URL}`
	);
});
