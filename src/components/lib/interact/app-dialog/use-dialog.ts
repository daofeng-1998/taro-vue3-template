import { Ref } from 'vue';
import { getNewState, setNewState, useComponentState } from '@/components/lib/script/component-states';
import { SYMBOL_DIALOG } from '@/components/lib/script/Symbols';

setNewState(SYMBOL_DIALOG, () => ({
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
    onCancel: undefined
} as IDialogSync));

/**
 * dialog控制器
 * @param state
 */
const newController = (state: Ref<IDialogSync>): IDialogControl => {

    const resetState = () => {
        const newState = getNewState<IDialogSync>(SYMBOL_DIALOG);
        newState.activated = true;
        state.value = newState;
    };

    return {
        /**
         * 更改dialog状态
         * @param newState
         */
        setState(newState: IDialogBase) {
            Object.assign<IDialogSync, IDialogBase>(state.value, newState);
        },
        show(options: IDialogBase) {
            resetState(); // 重置为默认状态，避免其他调用残留

            return new Promise((resolve, reject) => {

                Object.assign<IDialogSync, IDialogSync>(state.value, {
                    ...options,
                    activated: true,
                    show: true,
                    onConfirm: () => {
                        state.value.show = false;
                        setTimeout(resetState, 200);
                        resolve(undefined);
                    },
                    onCancel: () => {
                        state.value.show = false;
                        setTimeout(resetState, 200);
                        reject();
                    }
                });

            });
        },
        showContent(content: string, title?: string): Promise<undefined> {
            return this.show({
                content,
                title,
                showCancel: false,
                confirmText: '确定'
            });
        },
        showCancel(content: string, title?: string): Promise<undefined> {
            return this.show({
                content,
                title,
                showCancel: true,
                cancelText: '取消',
                confirmText: '确定'
            });
        }
    };
};

export const useDialog = (): IDialogControl => {
    const state: Ref<IDialogSync> = useComponentState<IDialogSync>(SYMBOL_DIALOG);

    if (!state.value.controller) {
        state.value.controller = newController(state); // 缓存控制器，一个实例只创建一个控制器
    }

    return state.value.controller;
};
