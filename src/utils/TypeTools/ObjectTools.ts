import { isEqualArray } from '@/utils/TypeTools/ArrayTools';
import { isBaseType, isNullOrUndefined } from '@/utils/TypeTools/TypesTools';

export const isObject = (object: any): boolean => {
    return typeof object === 'object';
};
/**
 * 判断是否为空对象
 */
export const isEmptyObject = (obj: object | null | undefined) => {
    // @ts-ignore
    return isNullOrUndefined(obj) || Object.keys(obj).length === 0;
};

/**
 * 判断任意数据类型是否相等
 */
export const isEqual = (object: any, target: any): boolean => {
    if (isBaseType(object) && isBaseType(target)) {
        if (Number.isNaN(object) && Number.isNaN(target))
            return true;
        return object === target; // 基础类型，直接判断
    }

    if (Array.isArray(object) && Array.isArray(target))
        return isEqualArray(object, target); // 数组类型通过数组判断相等函数进行判断

    if (object instanceof Date && target instanceof Date)
        return object.getTime() === target.getTime(); // Date类型通过时间戳进行判断

    if (object === target)
        return true; // 引用相同

    const sourceKeys = Object.keys(object);
    const targetKeys = Object.keys(target);

    if (!isEqualArray(sourceKeys, targetKeys))
        return false; // 两个对象所拥有的key不相同

    return sourceKeys.every((key) => {
        return isEqual(object[key], target[key]);
    });
};

/**
 * 深拷贝
 * @param target
 */
export const deepClone = <T>(target: T): T => {
    if (isBaseType(target)) {
        return target;
    } else if (Array.isArray(target)) {
        const arr = [];

        target.forEach((item) => {
            // @ts-ignore
            arr.push(deepClone(item));
        });
        // @ts-ignore
        return arr;
    } else if (target instanceof Date) {
        // @ts-ignore
        return new Date(target.getTime());
    } else {
        const obj = {};
        for (const key in target) {
            // @ts-ignore
            obj[key] = deepClone(target[key]);
        }
        // @ts-ignore
        return obj;
    }
};
