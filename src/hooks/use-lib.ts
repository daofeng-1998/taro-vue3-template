import { computed, ComputedRef, reactive, Ref, ref, UnwrapNestedRefs } from 'vue';
import { useRouter } from '@tarojs/taro';
import cache from '@/utils/Cache';
import { ROUTE_PARAMS_KEY } from '@/utils/Router';
import { BASE_TYPE } from '@/utils/Tools';
import { FormData } from '@/hooks/hooks';

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

export const useForm = <F extends object>(data: F): [UnwrapNestedRefs<FormData<F>>] => {

    // 基本数据类型 + function
    const dataTypes = BASE_TYPE.concat('function');

    const getDefaultValue = (ele) => {

        if (BASE_TYPE.includes(typeof ele)) {
            return ele; // 基础类型，直接返回
        } else if (typeof ele === 'function') {
            return ele(); // 数据工厂，调用获取新的值
        } else {
            return undefined; // 空
        }
    };

    const newData = () => {
        const newObj = {};
        for (const key in data) {

            const type = typeof data[key]; // 当前成员类型

            if (dataTypes.includes(type)) {
                // @ts-ignore
                newObj[key] = getDefaultValue(data[key]);
            } else {
                // @ts-ignore
                newObj[key] = getDefaultValue(data[key]['default']);
            }
        }
        return newObj;
    };

    const formData = reactive(newData());

    // @ts-ignore
    return [formData];
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
