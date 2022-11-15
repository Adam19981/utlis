type propType = Function | Object | Array<any> | String | Boolean | Number;

interface PropsDefault {
	type: propType;
	default: any;
}

export class createProp {
	static createAll(type: propType, defaultValue: any): PropsDefault {
		return { type: type, default: defaultValue };
	}

	static createFunction(defaultValue: (() => any) | null = null): PropsDefault {
		return this.createAll(Function, defaultValue);
	}

	static createObject(defaultValue: Record<string, any> | null = {}): PropsDefault {
		return this.createAll(Object, () => defaultValue);
	}

	static createArray(defaultValue: Array<any> | null = []): PropsDefault {
		return this.createAll(Array, () => defaultValue);
	}

	static createString(defaultValue: string | null = ""): PropsDefault {
		return this.createAll(String, defaultValue);
	}

	static createBoolean(defaultValue: boolean | null = false): PropsDefault {
		return this.createAll(Boolean, defaultValue);
	}

	static createNumber(defaultValue: number | null = 0): PropsDefault {
		return this.createAll(Number, defaultValue);
	}
}
