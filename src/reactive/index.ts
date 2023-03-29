import { controller } from "./controller";
import { defineReactive } from "./observe";
import { Watcher } from "./watcher";

class Vue {
	options: any = {
		data: {
			obj: {
				name: "陈",
				text: 1,
				list: ["nihao"]
			}
		}
	};
}

export function reactiveV3<T extends Record<string, any>>(target: T) {
	const handler = {
		get(target: T, prop: string, receiver: any): any {
			const res = target[prop];
			if (res && typeof res === "object") {
				return reactiveV3(res);
			}
			controller.on(prop, target);
			return Reflect.get(target, prop, receiver);
		},
		set(target: T, prop: string, newValue: any, receiver: any): boolean {
			Reflect.set(target, prop, newValue, receiver);
			controller.emit(prop, target);
			return true;
		}
	};
	return new Proxy(target, handler);
}

export function ref<T = any>(target: T) {
	return reactiveV3({ value: target });
}

export function set(target: Record<string, any>, key: string, value: any) {
	const obj = target.__ob__;
	console.log(obj);
	if (!obj) {
		target[key] = value;
		return;
	}
	defineReactive(target, key, value);
	obj.notify();
}

const { options } = new Vue();

defineReactive(options, "data", options["data"]);

const doc = document.createElement("div");
document.body.appendChild(doc);

function test() {
	let name: string = "";
	options.data.obj.list.forEach((item: string) => {
		name += item;
	});
	doc.innerText = name;
}
new Watcher(test);

const button = document.createElement("button");
button.style.width = "100px";
button.style.height = "100px";
button.innerText = "测试";
document.body.appendChild(button);
button.onclick = function () {
	options.data.obj.list.push("真的吗");
};
