import Taro from '@tarojs/taro';

/**
 * 向实例挂载数据
 * @param key
 * @param value
 */
export const mountInstance = <T>(key: string, value: T | any) => {
    const instance = Taro.getCurrentInstance()?.page;
    if (!instance) return;
    instance[key] = value;
};

/**
 * 取出挂载在实例上的数据
 * @param key
 */
export const fromInstance = <T>(key: string): T | undefined => {
    const instance = Taro.getCurrentInstance()?.page;
    if (!instance) return undefined;
    return instance[key] as T;
};
