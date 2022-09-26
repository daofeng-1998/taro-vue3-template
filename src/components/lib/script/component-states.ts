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
        content: '',
        show: false,
        showCancel: true,
        onConfirm: undefined,
        onCancel: undefined
    } as IDialogSync),
    // [SYMBOL_DIALOG]: () => ({
    //     activated: true,
    //     title: '测试标题',
    //     content: '测试内容',
    //     show: true,
    //     showCancel: true,
    //     onConfirm: undefined,
    //     onCancel: undefined
    // } as IDialogState)
};

export const useComponentState = <T>(key: string | symbol): Ref<T> => {
    return useInstanceDataWithDefault<T>(key, states[key]);
};
