type Type = "error" | "message" | "open" | "close";
type CallBackEv = MessageEvent | CloseEvent | Event;

class Socket {
	static _instance: Socket;

	socket?: WebSocket;

	status: string = "";

	funcMap: Map<Type, (ev: CallBackEv) => void> = new Map();

	constructor() {
		if ("WebSocket" in window) {
			this.init();
			return;
		}
		throw new Error("浏览器不支持，请换浏览器再试");
	}

	static getInstance() {
		if (!this._instance) {
			this._instance = new Socket();
		}
		return this._instance;
	}

	private init() {
		if (this.socket) return;
		this.socket = new WebSocket("");
		this.socket.onopen = (ev: Event) => {
			this.inject("open", ev);
		};
		this.socket.onmessage = (ev: MessageEvent) => {
			this.inject("message", ev);
		};
		this.socket.onerror = (ev: Event) => {
			this.inject("error", ev);
		};
		this.socket.close = () => {};
	}

	provide(key: Type, func: (ev: CallBackEv) => void) {
		const isHas = this.funcMap.has(key);
		if (!isHas) {
			this.funcMap.set(key, func);
		}
	}

	inject(key: Type, ev: CallBackEv) {
		const func = this.funcMap.get(key);
		if (func) {
			func(ev);
		}
	}

	send(event: any) {
		this.socket?.send(event);
	}
	close() {
		this.socket?.close();
		this.funcMap.clear();
	}
}

export const manager = Socket.getInstance();
