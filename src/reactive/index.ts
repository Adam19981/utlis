import { controller } from "./controller";

function reactive<T extends Record<string, any>>(target: T) {
	const handler = {
		get(target: T, prop: string, receiver: any): any {
			controller.add(prop, receiver);
			return Reflect.get(target, prop, receiver);
		},
		set(target: T, prop: string, newValue: any, receiver: any): boolean {
			Reflect.set(target, prop, newValue, receiver);
			controller.update(prop, receiver);
			return true;
		}
	};
	return new Proxy(target, handler);
}

const obj = reactive({
	name: "测试"
});

function changeName() {
	const div = document.getElementById("chen")!;
	div.innerText = obj.name;
}

controller.inject(changeName);

const button = document.createElement("button");
button.onclick = function () {
	obj.name = "测试响应式";
};

document.body.appendChild(button);
