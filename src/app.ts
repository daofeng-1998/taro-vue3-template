import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './app.scss';
import nutui from '@/plugins/nutui';
import { addRouterHook } from '@/utils/Router';
import { useDialog } from '@/components/lib/interact/app-dialog/use-dialog';
import { exactInterval } from '@/utils/Tools';

const App = createApp({
    onShow() {

        addRouterHook(async (currentPath, url, next) => {
            console.log('钩子触发 - onShow');
            console.log(`当前页：${currentPath}`);
            console.log(`目标页：${url}`);


            if (url.includes('pages/page1/index')) {
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
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});


App
    .use(nutui)
    .use(createPinia());


export default App;
