class Event {
	static _instance: Event;

	funcMap: Map<string, Set<(ev: any) => void>> = new Map();

	static getInstance() {
		if (!this._instance) {
			this._instance = new Event();
		}
		return this._instance;
	}

	subscribe(key: string, func: (ev: any) => void) {
		let funcSet = this.funcMap.get(key);
		if (!funcSet) {
			funcSet = new Set();
			this.funcMap.set(key, funcSet);
		}
		funcSet.add(func);
	}

	emit(key: string, ev: any) {
		const funcSet = this.funcMap.get(key);
		if (funcSet) {
			funcSet.forEach(func => {
				let data = ev;
				if (ev instanceof MessageEvent) {
					data = JSON.parse(ev.data);
				}
				func(data);
			});
		}
	}

	unsubscribe(key: string, func: (ev: any) => void) {
		const funcSet = this.funcMap.get(key);
		if (funcSet) {
			funcSet.delete(func);
		}
	}
}
export type EventConstructor = Event;
export const manager = Event.getInstance();
