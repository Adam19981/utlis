import { Watcher } from "./watcher";

export class Dep {
	watchers: Set<Watcher> = new Set();
	static target: Watcher | null;

	depend() {
		if (!Dep.target) return;
		this.watchers.add(Dep.target);
	}

	notify() {
		this.watchers.forEach(target => target.update());
	}
}
