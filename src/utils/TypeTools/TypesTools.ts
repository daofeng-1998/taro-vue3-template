/**
 * 基本数据类型
 */
export const BASE_TYPE = ['string', 'number', 'boolean', 'undefined', 'symbol', 'null'];

/**
 * 是否为基础数据类型
 * @param value
 */
export const isBaseType = (value: any) => {
    return value == null ? true : BASE_TYPE.includes(typeof value);
};

export const isString = (value: any): boolean => {
    return typeof value === 'string';
};

export const isNumber = (value: any): boolean => {
    return typeof value === 'number';
};

export const isBool = (value: any): boolean => {
    return typeof value === 'boolean';
};

export const isSymbol = (value: any): boolean => {
    return typeof value === 'symbol';
};

export const isUndefined = (value: any): boolean => {
    return value === undefined;
};

export const isNull = (value: any): boolean => {
    return value === null;
};

export const isNullOrUndefined = (value: any): boolean => {
    return isNull(value) || isUndefined(value);
};

/**
 * 判断多个数据类型是否一致
 * @param target
 * @param objects
 */
export const isFamily = (target: any, ...objects: any[]): boolean => {
    if (objects.length === 0)
        return true;

    const base = isNull(target) ? 'null' : typeof target;

    return objects.every((item) => {
        return base === (isNull(item) ? 'null' : typeof item);
    });
};

