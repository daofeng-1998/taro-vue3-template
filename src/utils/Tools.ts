/**
 * 全局环境对象
 */
import Taro from '@tarojs/taro';

export const globalEnv = window || self;

/**
 * 格式化数字，默认保留两位小数
 * @param {int} number 欲处理的数字
 * @param {int} length 要保留的小数位长度
 * @returns {string}
 */
export const formatMoney = (number: number, length: number = 2): string => {

    //有传递指定保留位数
    let numberStr = number.toFixed(length);

    const regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    return numberStr.replace(regForm, '$1,');
};

/**
 * 格式化日期对象为字符串
 * @param {Date} date 要格式化的Date对象
 * @param fmt 格式
 * @type {int}
 */
export const formatDate = (date: Date | string, fmt: string = 'yyyy-MM-dd HH:mm:ss'): string => {
    try {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        const o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'H+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
        };

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (date.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1
                        ? o[k]
                        : ('00' + o[k]).substr(('' + o[k]).length)
                );
            }
        }
        return fmt;
    } catch {
        return '';
    }
};

//生成从minNum到maxNum的随机数
export const random = (...args: number[]) => {
    const minNum = args[0];
    const maxNum = args[1];

    switch (args.length) {
        case 1:
            return Math.floor(Math.random() * minNum + 1);
        case 2:
            return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
        default:
            return 0;
    }
};

/**
 * 精确不卡顿的定时任务
 * @param func
 * @param delay
 */
export const exactInterval = (func: Function, delay: number): () => boolean => {
    let stop = false;

    let preTime = -1;
    const handle = (time: number): void => {

        if (preTime === -1) preTime = time;

        if (time - preTime >= delay) {
            preTime = time;
            // @ts-ignore
            Taro.nextTick(func);
        }

        stop || requestAnimationFrame(handle);
    };
    requestAnimationFrame(handle);

    return () => stop = true;
};
