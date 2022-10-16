import Taro from '@tarojs/taro';

/**
 * 精确不卡顿的定时任务
 * @param func
 * @param delay
 */
export const exactInterval = (func: Function, delay: number): () => boolean => {
    let stop = false;

    let preTime = -1;
    const handle = (time: number): void => {
        if (preTime === -1)
            preTime = time;

        if (time - preTime >= delay) {
            preTime = time;

            // @ts-ignore
            Taro.nextTick(func);
            // Taro.nextTick(func);
        }

        stop || requestAnimationFrame(handle);
    };
    requestAnimationFrame(handle);

    return () => stop = true;
};
