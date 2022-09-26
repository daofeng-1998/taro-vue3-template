import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './app.scss';
import nutui from '@/plugins/nutui';
import { addRouterHook } from '@/utils/Router';
import { useDialog } from '@/components/lib/interact/app-dialog/use-dialog';
import { asyncSleep } from '@/utils/AsyncAPI';

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
                let stop = false;

                promise.then(next).finally(() => stop = true);

                for (let i = 9; i >= 0 && !stop; i--) {
                    await asyncSleep(1000);
                    dialog.setState({
                        confirmText: `确定(${i})`
                    });
                }
                dialog.setState({
                    disableConfirm: false,
                    confirmText: '确定'
                });

            }
        });
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});


App
    .use(nutui)
    .use(createPinia());


export default App;
