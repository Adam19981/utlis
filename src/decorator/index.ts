const test: ClassDecorator = (target: any) => {
	console.log(target);
};

@test
class A {
	setup() {
		console.log("认真的吗");
	}
}

console.log(A);
// class B {
// 	constructor(private a: A) {}
//
// 	setup() {
// 		this.a.setup();
// 	}
// }
//
// const b = new B(new A());
// b.setup();
