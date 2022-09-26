import { Ref } from 'vue';
import { getNewState, useComponentState } from '@/components/lib/script/component-states';
import { SYMBOL_DIALOG } from '@/components/lib/script/Symbols';
import type { IDialogBase, IDialogControl, IDialogSync } from '@/components/lib/app';

const newController = (state: Ref<IDialogSync>): IDialogControl => {

    const resetState = () => {
        const newState = getNewState<IDialogSync>(SYMBOL_DIALOG);
        newState.activated = true;
        state.value = newState;
    };

    return {
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
                        resolve(undefined);
                    },
                    onCancel: () => {
                        state.value.show = false;
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
