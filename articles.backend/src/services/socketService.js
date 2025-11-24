const {Server} = require("socket.io");
const EventEmitter = require("events");

class SocketService extends EventEmitter {
	constructor() {
		super();
		this.io = null;
	}

	init(server, url) {
		if (this.io) return this.io;

		this.io = new Server(server, {
			cors: {
				origin: url,
				methods: ["GET", "POST", "PUT", "DELETE"],
			},
		});

		this.io.on("connection", socket => {
			this.emit("connection", socket);
			console.log("🟢 Client connected:", socket.id);

			socket.on("room:join", roomName => {
				this.joinRoom(socket, roomName);
			});

      socket.on("room:leave", roomName => {
				this.leaveRoom(socket, roomName);
			});

			socket.on("disconnect", () => {
				this.emit("disconnect", socket);
				console.log("🔴 Client disconnected:", socket.id);
			});
		});

		return this.io;
	}

	joinRoom(socket, room) {
		socket.join(room);
		console.log(`🟠 ${socket.id} joined room ${room}`);
	}

	leaveRoom(socket, room) {
		socket.leave(room);
		console.log(`🟡 ${socket.id} left room ${room}`);
	}

	broadcastToRoom(room, event, payload) {
		this.getIO().to(room).emit(event, payload);
	}

	broadcastToRoomExceptAuthor(room, event, payload, authorId) {
    console.log(authorId)
    this.getIO().to(room).except(authorId).emit(event, payload);
  }

	getIO() {
		if (!this.io) throw new Error("Socket.IO not initialized!");
		return this.io;
	}
}

module.exports = new SocketService();
