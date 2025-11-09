const {Server} = require("socket.io");

let io;

function initSocket(server, url) {
	io = new Server(server, {
		cors: {
			origin: url,
			methods: ["GET", "POST", "PUT", "DELETE"],
		},
	});

	io.on("connection", socket => {
		console.log("🟢 Client connected:", socket.id);

		socket.on("joinArticleRoom", articleId => {
			socket.join(articleId);
			console.log(`🟠 ${socket.id} joined room ${articleId}`);
		});

		socket.on("disconnect", () => {
			console.log("🔴 Client disconnected:", socket.id);
		});
	});

	return io;
}

function getIO() {
	if (!io) throw new Error("Socket.IO not initialized!");
	return io;
}

module.exports = {initSocket, getIO};
