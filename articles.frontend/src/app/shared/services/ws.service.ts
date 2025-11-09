import {Injectable} from "@angular/core";
import {io, Socket} from "socket.io-client";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class SocketService {
	private socketUrl = environment.api.wsUrl;
	public socket!: Socket;

	constructor() {
		this.connect();
	}

	private connect(): void {
		this.socket = io(this.socketUrl, {
			transports: ["websocket"],
			withCredentials: true,
		});
	}

	joinArticleRoom(articleId: string) {
		this.socket.emit("joinArticleRoom", articleId);
	}

	listen<T>(event: string): Observable<T> {
		return new Observable(subscriber => {
			this.socket.on(event, (data: T) => subscriber.next(data));
		});
	}

	emit(event: string, data?: any): void {
		this.socket.emit(event, data);
	}

	disconnect(): void {
		this.socket.disconnect();
	}
}
