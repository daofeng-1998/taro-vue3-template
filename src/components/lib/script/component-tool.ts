import Taro from '@tarojs/taro';
import { Ref, ref } from 'vue';

export const useInstance = (): Taro.PageInstance | null => {
    return Taro.getCurrentInstance().page;
};

export const provide = (key: string | symbol, data: any) => {
    const instance = useInstance();
    if (instance) instance[key] = data;
};

export const inject = <T>(key: string | symbol): T | null => {
    const instance = useInstance();
    return instance ? instance[key] as T : null;
};

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
