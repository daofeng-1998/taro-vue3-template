import { Navbar, Icon, Button, Notify, OverLay } from '@nutui/nutui-taro';

const el = [Navbar, Icon, Button, Notify, OverLay];

export default {
    install(app) {
        el.forEach(app.use);
    }
};
