import { SYMBOL_LOADING } from '@/components/lib/script/Symbols';
import { useComponentState } from '@/components/lib/script/component-states';

export const newLoadingState = () => ({
    show: false,
    activated: false,
    msg: ''
});

export const useLoading = (): {
    show(msg?: string)
    hide()
} => {

    const state = useComponentState<ILoadingState>(SYMBOL_LOADING);

    const show = (msg?: string) => {
        if (!state?.value) return;

        if (!state.value.activated) state.value.activated = true;

        Object.assign(state.value, {
            msg,
            activated: true,
            show: true
        });
    };
    const hide = () => {
        if (!state?.value) return;

        Object.assign(state.value, {
            msg: '',
            show: false
        });
    };

    return {
        show,
        hide
    };
};
