import { fromInstance } from '@/components/lib/script/common';

export const showNotify = (msg: string) => {
    const notifyState = fromInstance<INotifyState>('notifyState');
    if (!notifyState) return;

    notifyState.show = true;
    notifyState.msg = msg;
};
