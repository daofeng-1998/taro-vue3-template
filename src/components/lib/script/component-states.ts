import { SYMBOL_DIALOG, SYMBOL_LOADING } from '@/components/lib/script/Symbols';
import { useInstanceDataWithDefault } from '@/components/lib/script/component-tool';
import { Ref } from 'vue';

const states = {
    /** loading */
    [SYMBOL_LOADING]: () => ({
        show: false,
        activated: false,
        msg: ''
    } as ILoadingState),
    /** dialog */
    [SYMBOL_DIALOG]: () => ({
        activated: false,
        title: '',
        titleColor: '',
        content: '',
        contentColor: '',
        show: false,
        showCancel: false,
        cancelText: '取消',
        cancelColor: undefined,
        confirmColor: undefined,
        confirmText: '确定',
        disableConfirm: false,
        disableCancel: false,
        onConfirm: undefined,
        onCancel: undefined
    } as IDialogSync),
};

export const getNewState = <T>(key: string | symbol): T => {
    return states[key]() as T;
};

export const useComponentState = <T>(key: string | symbol): Ref<T> => {
    return useInstanceDataWithDefault<T>(key, states[key]);
};
