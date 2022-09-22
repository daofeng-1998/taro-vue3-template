import { toPromise } from '@/utils/AsyncTool';
import Taro from '@tarojs/taro';

export const AsyncRequest = toPromise(Taro.request);
