import { fromInstance } from '@/utils/InstanceTools';
import { useReactive } from '@/hooks/commonHooks';

export const showNotify = (msg: string) => {
    const notifyState = fromInstance<INotifyState>('notifyState');
    if (!notifyState) return;

    notifyState.show = true;
    notifyState.msg = msg;
};

export const showLoading = (msg?: string) => {
    const loadingState = useReactive<ILoadingState>('loadingState');

    if (!loadingState.activated) loadingState.activated = true;
    Object.assign(loadingState, {
        msg,
        show: true
    });
};

export const hideLoading = () => {
    const loadingState = useReactive<ILoadingState>('loadingState');

    Object.assign(loadingState, {
        msg: '',
        show: false
    });
};
