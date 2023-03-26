import { Dep } from "./dep";
export class Watcher {
	cb: () => any;

	constructor(cb: () => any) {
		Dep.target = this;
		this.cb = cb;
		this.cb();
		Dep.target = null;
	}

	update() {
		this.cb();
	}
}
