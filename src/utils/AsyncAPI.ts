import Taro from '@tarojs/taro';
import { promisify } from '@/utils/AsyncTool';

export const asyncRequest = promisify(Taro.request);

export const asyncSleep = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};
