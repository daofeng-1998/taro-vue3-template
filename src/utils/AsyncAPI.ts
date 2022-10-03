import { promisify } from '@/utils/AsyncTool';
import Taro from '@tarojs/taro';

export const asyncRequest = promisify(Taro.request);

export const asyncSleep = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};
