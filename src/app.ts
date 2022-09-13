import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './app.scss';

import Taro from "@tarojs/taro";
import nutui from "@/plugins/nutui";
import { addRouterHook } from "@/utils/Router";


const App = createApp({
    onShow() {
        addRouterHook(async (currentPath, url, next) => {
            console.log('钩子触发 - onShow');
            console.log(`当前页：${currentPath}`);
            console.log(`目标页：${url}`);


            if (url.includes('pages/page1/index')) {
                const res = await Taro.showModal({
                    content: '是否继续跳转'
                });
                if (res.confirm) {
                    next(); // 放行
                }
            }
        });
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});


App
    .use(nutui)
    .use(createPinia());


export default App;
