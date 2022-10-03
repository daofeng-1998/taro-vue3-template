import { computed, ComputedRef } from 'vue';

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
