import { computed, ComputedRef, reactive, Ref, ref, UnwrapNestedRefs } from 'vue';
import { useRouter } from '@tarojs/taro';
import cache from '@/utils/Cache';
import { ROUTE_PARAMS_KEY } from '@/utils/Router';

export const useVModel = <T>(props: Object, key: string, emit: Function) => {
    return computed<T>({
        get: () => props[key],
        set: (val) => emit(`update:${key}`, val)
    });
};

/**
 * 对数组求和
 * @param list
 * @param field
 */
export const useSumForList = <T>(
    list: T[],
    field?: keyof T | ((item: T) => number)
): ComputedRef<number> => {
    const isFunc = typeof field === 'function';
    const isEmpty = !!field;

    return computed(() => {
        return list.reduce<number>((pre, item) => {
            // @ts-ignore
            return pre + isFunc ? field(item) : (isEmpty ? item : item[field]);
        }, 0);
    });
};

/**
 * 使用一个表单数据对象
 * @param newData
 */
export const useFormData = <D extends object, R>(newData: () => D): [UnwrapNestedRefs<D>, () => void, Ref<R | null>] => {
    const data = reactive(newData());

    const reset = () => {
        Object.assign(data, newData());
    };
    return [data, reset, ref(null)];
};


export const useRouteParams = () => {
    const state = reactive({});
    const { params } = useRouter();

    if (params[ROUTE_PARAMS_KEY]) {
        const data = cache.get(params[ROUTE_PARAMS_KEY]);
        Object.assign(state, params, data);

        delete state[ROUTE_PARAMS_KEY];
        delete state['$taroTimestamp'];
    }

    return state;
};
