import { Navbar, Icon, Button } from "@nutui/nutui-taro";

const el = [Navbar, Icon, Button];

export default {
    install(app) {
        el.forEach(app.use);
    }
};
