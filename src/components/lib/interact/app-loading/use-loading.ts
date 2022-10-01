import { SYMBOL_LOADING } from '@/components/lib/script/Symbols';
import { Ref } from 'vue';
import { setNewState, useComponentState } from '@/components/lib/script/component-states';

setNewState(SYMBOL_LOADING, () => ({
    show: false,
    activated: false,
    msg: ''
}));

export const useLoading = (): {
    show(msg?: string)
    hide()
} => {

    const state: Ref<ILoadingState> = useComponentState<ILoadingState>(SYMBOL_LOADING);

    return {
        show(msg?: string) {
            if (!state?.value) return;

            if (!state.value.activated) state.value.activated = true;
            Object.assign(state.value, {
                msg,
                show: true
            });
        },
        hide() {
            if (!state?.value) return;

            Object.assign(state.value, {
                msg: '',
                show: false
            });
        }
    };
};
