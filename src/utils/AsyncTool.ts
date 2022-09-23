import { showModal } from '@tarojs/taro';

/**
 * 将回调形式的异步方法转为Promise，对应的success回调会指向resolve，fail指向reject
 * @param method
 */
export const toPromise = (method: Function) => {
    return function (options) {
        return new Promise((resolve, reject) => {
            method({
                ...options,
                success: resolve,
                fail: (error) => {
                    reject(error.errMsg ? new Error(error.errMsg) : error);
                }
            });
        });
    };
};

/**
 * 异步循环call
 * */
export const cycleCallAsync = (count: number, method: Function): Function => {
    return async function (...args) {
        let counter = 0;
        do {
            try {
                return await method(...args);
            } catch (error) {
                if (++counter >= count) throw error;
            }
        } while (true);
    };
};

/**
 * 异常捕获方法
 * @param {Promise} promise
 * @returns
 */
export const to = async <T>(promise: Promise<T>): Promise<[Error | any, T | null]> => {
    try {
        const res = await promise as T;
        return [null, res];
    } catch (error) {
        return [error, null];
    }
};

/**
 * 捕获异步函数错误，当然同步函数也支持，并showModal
 * @param func
 */
export const er = (func: (...args: any[]) => Promise<unknown> | any) => {
    return async (...args: any[]) => {
        try {
            return await func(...args);
        } catch (error) {
            // console.log(error instanceof Error);
            showModal({
                showCancel: false,
                content: error.toString()
            });
        }
    };
};
