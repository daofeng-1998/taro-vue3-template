import { computed } from 'vue';


export const useVModel = <T>(props: Object, key: string, emit: Function) => {
    return computed<T>({
        get: () => props[key],
        set: (val) => emit(`update:${key}`, val)
    });
};
