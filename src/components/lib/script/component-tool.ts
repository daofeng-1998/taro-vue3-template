import Taro from '@tarojs/taro';
import type { Ref } from 'vue';
import { inject, provide, ref } from 'vue';

/** 使用当前实例 */
export const useInstance = (): Taro.PageInstance | null => {
    return Taro.getCurrentInstance().page;
};

/** 从当前实例取出数据，如果当前实例没有该数据，则产生一个默认数据并注入当前实例 */
export const useInstanceDataWithDefault = <T>(
    key: string | symbol,
    defaultSate: () => T,
) => {
    let state = inject<Ref<T>>(key);

    if (!state) {
        state = ref(defaultSate()) as Ref<T>;
        provide(key, state);
    }
    return state;
};
