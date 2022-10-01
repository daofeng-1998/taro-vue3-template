import { addRouterHook } from '@/utils/Router';
import { useDialog } from '@/components/lib/interact/app-dialog/use-dialog';
import { exactInterval } from '@/utils/Tools';

addRouterHook(async (currentPath, url, next) => {
    console.log('钩子触发 - onShow');
    console.log(`当前页：${currentPath}`);
    console.log(`目标页：${url}`);


    if (url?.includes('pages/page1/index')) {
        const dialog = useDialog();

        const promise = dialog.show({
            content: '是否继续跳转',
            showCancel: true,
            disableConfirm: true,
            confirmText: '确定(10)'
        });

        let i = 9;
        const stop = exactInterval(() => {

            dialog.setState({ confirmText: `确定(${i})` });

            if (i-- <= 0) {
                stop();
                dialog.setState({
                    confirmText: '确定',
                    disableConfirm: false,
                });
            }
        }, 1000);

        promise.then(next).finally(stop);
    } else next();
});
