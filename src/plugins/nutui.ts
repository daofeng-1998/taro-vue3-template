import {
    Button,
    Cell,
    CellGroup,
    Form,
    FormItem,
    Icon,
    Input,
    Navbar,
    Notify,
    OverLay,
    Switch
} from '@nutui/nutui-taro';

const el = [Navbar, Icon, Button, Notify, OverLay, Cell, CellGroup, Switch, Form, FormItem, Input];

export default {
    install(app) {
        el.forEach(app.use);
    }
};
