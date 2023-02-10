import { manager as eventManager, EventConstructor } from "../event";
interface Options {
	url: string;
	timeOut?: number;
	timeInterval?: number;
}
enum ReadyState {
	CONNECTING, //连接尚未建立
	OPEN, //WebSocket的链接已经建立
	CLOSING, //连接正在关闭
	CLOSED //连接已经关闭或不可用
}

class Socket {
	static _instance: Socket;

	_options: Options = { url: "", timeOut: 3000, timeInterval: 5000 };

	socket?: WebSocket;

	timeOutId?: number;

	timeIntervalId?: number;

	errorStack: Set<string> = new Set();

	isCustomClose: boolean = false; //是否手动关闭

	isReconnectionLoading: boolean = false; //是否在重新连接中

	eventCenter: EventConstructor = eventManager;

	constructor(options: Options) {
		if ("WebSocket" in window) {
			Object.assign(this._options, options);
			this.init();
			return;
		}
		throw new Error("浏览器不支持，请换浏览器再试");
	}

	static getInstance(options: Options) {
		if (!this._instance) {
			this._instance = new Socket(options);
		}
		return this._instance;
	}

	private init() {
		if (this.socket?.readyState === ReadyState.OPEN) return;
		this.socket = new WebSocket(this._options.url);

		this.socket.onopen = (ev: Event) => {
			this.errorStack.forEach(message => {
				this.socket!.send(message);
			});
			this.errorStack.clear();
			this.isReconnectionLoading = false;
			this.ping();
			this.eventCenter.emit("open", ev);
		};

		this.socket.onmessage = (ev: MessageEvent) => {
			this.eventCenter.emit("message", ev);
		};

		this.socket.onerror = (ev: Event) => {
			this.reconnection();
			this.isReconnectionLoading = false;
			this.eventCenter.emit("error", ev);
		};

		this.socket.onclose = () => {
			if (this.isCustomClose) return;
			this.reconnection();
			this.isReconnectionLoading = false;
		};
	}

	private reconnection() {
		if (this.isReconnectionLoading) return;
		this.isReconnectionLoading = true;
		this.timeOutId && clearTimeout(this.timeOutId);
		this.timeOutId = window.setTimeout(() => {
			this.init();
		}, this._options.timeOut);
	}

	private ping() {
		this.timeIntervalId && clearInterval(this.timeIntervalId);
		this.timeIntervalId = window.setInterval(() => {
			this.socket?.send("ping");
		}, this._options.timeInterval);
	}

	send(event: any) {
		if (this.socket?.readyState !== ReadyState.OPEN) {
			this.errorStack.add(JSON.stringify(event));
			return;
		}
		this.socket?.send(JSON.stringify(event));
	}

	close() {
		this.isCustomClose = true;
		this.socket?.close();
	}

	open() {
		this.isCustomClose = false;
		this.init();
	}

	destroy() {
		this.close();
		this.socket = undefined;
		this.eventCenter.funcMap.clear();
	}
}

export const manager = Socket.getInstance;
