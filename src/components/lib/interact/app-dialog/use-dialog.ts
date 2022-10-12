import type { Ref } from 'vue';
import { useComponentState } from '@/components/lib/script/component-states';
import { SYMBOL_DIALOG } from '@/components/lib/script/Symbols';

export const newDialogState = () => ({
    activated: false,
    title: '',
    titleColor: '',
    content: '',
    contentColor: '',
    contentType: 'TEXT',
    show: false,
    showCancel: false,
    cancelText: '取消',
    cancelColor: undefined,
    confirmColor: undefined,
    confirmText: '确定',
    disableConfirm: false,
    disableCancel: false,
    onConfirm: undefined,
    onCancel: undefined,
});

export const useDialog = (): IDialogControl => {
    const state: Ref<IDialogSync> = useComponentState<IDialogSync>(SYMBOL_DIALOG);

    const resetState = () => {
        const newState = newDialogState() as IDialogSync;
        newState.activated = true;
        state.value = newState;
    };

    /**
     * 更改dialog状态
     * @param newState
     */
    const setState = (newState: IDialogBase) => {
        Object.assign<IDialogSync, IDialogBase>(state.value, newState);
    };

    const close = () => {
        state.value.show = false;
        // setTimeout(resetState, 200);
    };

    const show = (options: IDialogBase) => {
        resetState(); // 重置为默认状态，避免其他调用残留

        return new Promise((resolve, reject) => {
            Object.assign<IDialogSync, IDialogSync>(state.value, {
                ...options,
                activated: true,
                show: true,
                onConfirm: () => {
                    close();
                    resolve(undefined);
                },
                onCancel: () => {
                    close();
                    reject();
                },
            });
        });
    };

    const showContent = (content: string, title?: string): Promise<unknown> => {
        return show({
            content,
            title,
            showCancel: false,
            contentType: 'TEXT',
            confirmText: '确定',
        });
    };

    const showCancel = (content: string, title?: string): Promise<unknown> => {
        return show({
            contentType: 'TEXT',
            content,
            title,
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
        });
    };

    return {
        setState,
        close,
        show,
        showContent,
        showCancel,
    };
};

