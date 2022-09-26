import { Ref } from 'vue';
import { useComponentState } from '@/components/lib/script/component-states';
import { SYMBOL_DIALOG } from '@/components/lib/script/Symbols';

const newController = (state: Ref<IDialogSync>): IDialogControl => {
    return {
        show(options: IDialogBase) {

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
