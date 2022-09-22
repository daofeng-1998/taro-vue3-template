import { Navbar, Icon, Button, Notify } from '@nutui/nutui-taro';

const el = [Navbar, Icon, Button, Notify];

export default {
    install(app) {
        el.forEach(app.use);
    }
};
