/**
 * 全局环境对象
 */
export const globalEnv = window || self || global;

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

/**
 * 倒计时工具
 * @param {object} option -  配置项
 * @param {number} option.timestemp - 时间戳，毫秒
 * @param {number} option.interval=1000 - 间隔时间, 默认1000毫秒
 * @param {Function} [option.callback] - 回调
 * @returns {Function} cancel 停止计时器
 * 注（一定注意）：不管是使用此工具还是自己写，回调的整体执行时间都不应该超过interval
 */
export const countdown = function ({
    timestemp,
    interval: originalInterval = 1000,
    callback,
}) {
    if (!timestemp || timestemp <= 0 || timestemp < originalInterval) return callback?.(0);

    let stop = false;
    const cancel = () => {
        stop = true;
    };

    let curIdx = 1;
    let interval = originalInterval;
    let ct = Date.now();
    countdown(interval);

    function countdown(interval) {
        if (stop) return;
        let timer = setTimeout(function () {
            clearTimeout(timer);

            let resetTime = timestemp - originalInterval * curIdx;
            if (resetTime < 0) resetTime = 0;
            callback?.(resetTime);
            if (!resetTime) return;

            curIdx++;

            let ct2 = Date.now();
            let deviation = ct2 - interval - ct;
            if (deviation >= originalInterval || deviation <= 0) deviation = 5; // 防止恶意更改本地时间
            ct = Date.now();
            countdown(originalInterval - deviation - (ct - ct2));
        }, interval);
    }

    return cancel;
};
