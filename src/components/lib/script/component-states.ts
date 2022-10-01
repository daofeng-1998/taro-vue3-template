import { useInstanceDataWithDefault } from '@/components/lib/script/component-tool';
import { Ref } from 'vue';

/**
 * 状态容器
 */
const states = {};

/**
 * 设置一个新状态工厂函数
 * @param key
 * @param dataMethod
 */
export const setNewState = (key: string | symbol, dataMethod: Function): void => {
    states[key] = dataMethod;
};

/**
 * 通过工厂函数获取一个新状态
 * @param key
 */
export const getNewState = <T>(key: string | symbol): T => {
    return states[key]() as T;
};

/**
 * 使用当前实例的状态，如果没有，则创建一个新的状态并注入并返回
 * @param key
 */
export const useComponentState = <T>(key: string | symbol): Ref<T> => {
    return useInstanceDataWithDefault<T>(key, states[key]);
};
