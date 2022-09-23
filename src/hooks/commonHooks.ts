import { computed, reactive, Ref, ref } from 'vue';
import Taro from '@tarojs/taro';
import type { UnwrapNestedRefs } from '@vue/reactivity';
import { fromInstance, mountInstance } from '@/utils/InstanceTools';

/**
 * 使用当前页面实例
 */
export const usePage = (): Taro.PageInstance | null => {
    return Taro.getCurrentInstance().page;
};

export const useVModel = (props: Object, key: string, emit: Function) => {
    return computed({
        get: () => props[key],
        set: (val) => emit(`update:${key}`, val)
    });
};

export const useReactive = <T extends object>(key: string, data?: T): UnwrapNestedRefs<T> => {
    if (data) {
        const r = reactive<T>(data);
        mountInstance(key, r);
        return r;
    } else {
        let r = fromInstance(key);
        if (!r) r = reactive({});

        return r as UnwrapNestedRefs<T>;
    }
};

export const useRef = <T>(key: string, data: T): Ref<T> => {
    const r = ref(data);
    mountInstance(key, r);
    return r as Ref<T>;
};
