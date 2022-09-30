import { Button, Cell, CellGroup, Icon, Navbar, Notify, OverLay, Switch } from '@nutui/nutui-taro';

const el = [Navbar, Icon, Button, Notify, OverLay, Cell, CellGroup, Switch];

export default {
    install(app) {
        el.forEach(app.use);
    }
};
