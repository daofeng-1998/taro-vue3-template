import Taro from '@tarojs/taro';
import { Ref, ref } from 'vue';

/** 使用当前实例 */
export const useInstance = (): Taro.PageInstance | null => {
    return Taro.getCurrentInstance().page;
};

/** 向当前实例注入数据 */
export const provide = (key: string | symbol, data: any) => {
    const instance = useInstance();
    if (instance) instance[key] = data;
};

/** 从当前实例取出数据 */
export const inject = <T>(key: string | symbol): T | null => {
    const instance = useInstance();
    return instance ? instance[key] as T : null;
};

/** 从当前实例取出数据，如果当前实例没有该数据，则产生一个默认数据并注入当前实例 */
export const useInstanceDataWithDefault = <T>(
    key: string | symbol,
    defaultSate: () => T
) => {
    let state = inject<Ref<T>>(key);

    if (!state) {
        state = ref(defaultSate()) as Ref<T>;
        provide(key, state);
    }
    return state;
};
