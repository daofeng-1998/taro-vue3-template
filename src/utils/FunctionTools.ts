import { globalEnv } from "@/utils/tools";

/**
 * 柯里化
 * @param {Function} func
 * @returns
 */
export const curry = (func: Function): Function => {
    return function _(...args) {
        if (args.length < func.length) {
            return function (...a) {
                return _(...args.concat(a));
            };
        } else {
            return func(...args);
        }
    };
};

/**
 * 防抖
 * @param {Number} wait 间隔时间
 * @param {Boolean} immediate 是否立即实行（true为执行第一次，false为执行最后一次）
 * @param {Function} handle 处理函数
 */
export const debounce = (wait: number, immediate: boolean, handle: Function): Function => {
    if (typeof handle !== 'function') {
        throw new Error('handle must be an function');
    }

    let timeout = -1;

    return function (...args) {
        timeout != -1 && clearTimeout(timeout);
        const init = immediate && timeout === -1;

        timeout = globalEnv.setTimeout(() => {
            timeout = -1;
            !immediate && handle.apply(this, args);
        }, wait);

        init && handle.apply(this, args);
    };
};

/**
 * 节流
 * @param {Number} wait 间隔
 * @param {Function} handle 处理函数
 */
export const throttle = (wait: number, handle: Function): Function => {

    let previous = Date.now();

    return function () {
        if (Date.now() - previous > wait) {
            previous = Date.now();
            handle.apply(this, arguments);
        }
    };
};

