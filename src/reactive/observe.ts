import { Dep } from "./dep";

export function observer(target: any) {
	if (typeof target !== "object" || target.__ob__) return;
	Object.defineProperty(target, "__ob__", {
		value: new Dep(),
		configurable: true,
		writable: true
	});
	if (Array.isArray(target)) {
		reactiveArray(target);
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
		enumerable: true,
		get() {
			console.log("get");
			dep.depend();
			value.__ob__ && value.__ob__.depend();
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

export function reactiveArray(target: any) {
	const obj = Object.create(Array.prototype);
	const methodsList = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"];

	methodsList.forEach(item => {
		const methods = obj[item];
		Object.defineProperty(obj, item, {
			value: function (...args: any) {
				methods.apply(this, args);
				target.__ob__.notify();
			}
		});
	});
	target.__proto__ = obj;
}
