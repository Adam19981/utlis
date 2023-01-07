class Controller {
	activeFunc: (() => any) | null = null;
	depMap: WeakMap<object, Map<string, Set<any>>> = new WeakMap();

	inject(func: () => any) {
		this.activeFunc = func;
		this.activeFunc();
		this.activeFunc = null;
	}

	add(key: string, object: object) {
		if (!this.activeFunc) {
			return;
		}
		let depObj = this.depMap.get(object);
		if (!depObj) {
			depObj = new Map();
			this.depMap.set(object, depObj);
		}
		let depKey = depObj.get(key);
		if (!depKey) {
			depKey = new Set();
			depObj.set(key, depKey);
		}
		depKey.add(this.activeFunc);
	}

	update(key: string, object: object) {
		const depObj = this.depMap.get(object);
		if (depObj) {
			const depKey = depObj.get(key);
			if (depKey) {
				depKey.forEach(item => item());
			}
		}
	}
}

export const controller = new Controller();
