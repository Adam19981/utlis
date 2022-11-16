export declare const isClient: boolean;
export declare const isIOS: boolean;
export declare function is(value: unknown, type: string): boolean;
export declare function has(value: Record<string, any>, key: string | symbol): key is keyof typeof value;
export declare function isDefined<T = unknown>(value: T | undefined | null): value is T;
export declare function isNull(value: unknown): value is null | undefined;
export declare function isNumber(value: unknown): value is number;
export declare function isNaN(value: unknown): value is number;
export declare function isString(value: unknown): value is string;
export declare function isBoolean(value: unknown): value is boolean;
export declare function isTrue(value: unknown): value is true;
export declare function isFalse(value: unknown): value is false;
export declare function isSymbol(value: unknown): value is symbol;
export declare function isBigInt(value: unknown): value is bigint;
export declare function isArray(value: unknown): value is any[];
export declare function isObject<T extends Record<string, any> = Record<string, any>>(value: unknown): value is T;
export declare function isPromise(value: unknown): value is Promise<any>;
export declare function isFunction(value: unknown): value is (...any: any[]) => any;
export declare function isSet(value: unknown): value is Set<any>;
export declare function isMap(value: unknown): value is Map<any, any>;
export declare function isDate(value: unknown): value is Date;
export declare function isRegExp(value: unknown): value is RegExp;
export declare function isEmpty(value: unknown): boolean;
export declare function isElement(value: unknown): value is Element;
export declare function noop(...args: any[]): any;
/**
 * 生成一个 range 数组
 *
 * @param size 大小
 * @param start 开始的数值，默认为 1
 * @param step 跨度，默认为 1
 */
export declare function range(size: number, start?: number, step?: number): number[];
/**
 * 获取变量类型
 *
 * @param value 任意变量
 */
export declare function getType(value: unknown): any;
/**
 * 根据长度生成一串随机的字符串
 *
 * @param length 字符串的长度
 */
export declare function randomString(length?: number): string;
