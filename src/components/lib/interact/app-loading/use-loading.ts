import { useInstanceDataWithDefault } from '@/components/lib/script/component-tool';
import { SYMBOL_LOADING } from '@/components/lib/script/Symbols';
import { Ref } from 'vue';

const newState = (): ILoadingState => {
    return {
        show: false,
        activated: false,
        msg: ''
    };
};

export const useLoadingState = (): Ref<ILoadingState> => {
    return useInstanceDataWithDefault(SYMBOL_LOADING, newState);
};

export const useLoading = (): ILoading => {

    const state: Ref<ILoadingState> = useLoadingState();

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
    } as ILoading;
};
