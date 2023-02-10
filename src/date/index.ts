function dateFormat(fmt: string, date: Date): string {
	let ret;
	const opt: Record<string, any> = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (const k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
		}
	}

	return fmt;
}

export function getLocalDate(format: string, timestamp: number): string {
	if (timestamp) return dateFormat(format, new Date(Math.trunc(timestamp) * 1000));
	return "—";
}

export function getYear(): Record<string, number> {
	const firstDay = new Date(new Date().toLocaleDateString());
	firstDay.setDate(1);
	firstDay.setMonth(0);
	const lastDay = new Date(new Date().toLocaleDateString());
	lastDay.setFullYear(lastDay.getFullYear() + 1);
	lastDay.setMonth(0); // 切换至下一年的一月
	lastDay.setDate(0); // 0表示上个月的最后一天
	const start = Math.trunc(firstDay.getTime() / 1000);
	const end = Math.trunc((lastDay.getTime() + 24 * 60 * 60 * 1000 - 1) / 1000);
	return {
		start,
		end
	};
}

export function getDay(): Record<string, number> {
	const startTime = new Date(new Date().toLocaleDateString()).getTime(); // 当天 00.00
	const endTime = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1; // 当天23:59
	const start = Math.trunc(startTime / 1000);
	const end = Math.trunc(endTime / 1000);
	return {
		start,
		end
	};
}

export function getWeek(): Record<string, number> {
	const now = new Date();
	const nowTime = new Date(new Date().toLocaleDateString()).getTime();
	const day = now.getDay();
	const oneDayTime = 24 * 60 * 60 * 1000;
	const startTime = nowTime - (day - 1) * oneDayTime; // 本周第一天 00.00时间戳
	const endTime = nowTime + (7 - day) * oneDayTime + 24 * 60 * 60 * 1000 - 1; // 本周最后一天 23.59时间戳
	const start = Math.trunc(startTime / 1000);
	const end = Math.trunc(endTime / 1000);
	return {
		start,
		end
	};
}

export function getMouth(): Record<string, number> {
	const nowDate = new Date();
	const endOfMonth = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate(); // 0表示上个月的最后一天， getDate()获取当天日期，表达当月的最大天数。
	const endDate = new Date(nowDate.setDate(endOfMonth)); // 当月最后一天
	const startDate = new Date(nowDate.setDate(1)); // 当月第一天
	const startTime = new Date(startDate.toLocaleDateString()).getTime(); // 当月第一天00.00 时间戳
	const endTime = new Date(endDate.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1; // 当月最后一天23.59 时间戳
	const start = Math.trunc(startTime / 1000);
	const end = Math.trunc(endTime / 1000);
	return {
		start,
		end
	};
}
