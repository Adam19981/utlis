import { Dep } from "./dep";

export function observer(target: any) {
	if (typeof target !== "object") return;
	if (target.__ob__) return;
	Object.defineProperty(target, "__ob__", {
		value: new Dep(),
		configurable: true,
		writable: true
	});
	if (Array.isArray(target)) {
		return;
	}
	Object.keys(target).forEach(key => {
		const value = target[key];
		defineReactive(target, key, value);
	});
}

export function defineReactive(target: any, key: string, value: any) {
	observer(value);
	const dep = new Dep();
	const propertyDescriptor = {
		configurable: true,
		get() {
			console.log("get");
			dep.depend();
			if (value.__ob__) {
				value.__ob__.depend();
			}
			return value;
		},
		set(newValue: any) {
			console.log("set");
			if (newValue === value) return;
			value = newValue;
			dep.notify();
			observer(value);
		}
	};
	Object.defineProperty(target, key, propertyDescriptor);
}
