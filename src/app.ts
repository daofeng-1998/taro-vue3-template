import { createApp } from 'vue';
import './app.scss';
import nutui from '@/plugins/nutui';

// 导入自定义组件状态，需要优先导入
import '@/components/lib/script/component-states';
import store from '@/store';
import { navigateAny, redirectAny, switchAny } from '@/utils/RouterNext';

const App = createApp({
    onShow() {
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App
    .use(nutui)
    .use(store);

// 设置启动时间
useCommonStore().lunchTime = Date.now();

export default App;
