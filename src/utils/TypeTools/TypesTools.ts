/**
 * 基本数据类型
 */
export const BASE_TYPE = ['string', 'number', 'bigint', 'boolean', 'undefined', 'symbol', 'null'];

/**
 * 是否为基础数据类型
 * @param value
 */
export const isBaseType = (value: any) => {
    return BASE_TYPE.includes(typeof value);
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

