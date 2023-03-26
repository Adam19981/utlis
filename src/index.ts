import { createProp } from "./props";
import * as SDate from "./date";
import * as SPerformance from "./performance";
import * as SCommon from "./common";
import * as SWebsocket from "./websocket";
import * as SEvent from "./event";
import * as SReactive from "./reactive";

export { createProp, SDate, SCommon, SPerformance, SWebsocket, SEvent, SReactive };

const obj = {
	a() {
		console.log(this);
	}
};

obj.a();
