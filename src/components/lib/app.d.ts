interface IBaseState {
    /** 是否激活 */
    activated: Boolean
}

interface IVisible {
    /** 是否显示 */
    show: Boolean
}

interface IMsg {
    /** 消息内容 */
    msg?: string
}

interface IController<C> {
    /** 控制器 */
    controller?: C
}

/**
 * 通知状态
 */
interface INotifyState extends IBaseState, IVisible, IMsg {
}

/**
 * loading状态
 */
interface ILoadingState extends IBaseState, IVisible, IMsg {
}

interface IDialogBase {
    /** 标题 */
    title: string
    /** 标题字体颜色 */
    titleColor?: string
    /** 内容 */
    content: string
    /** 内容字体颜色 */
    contentColor?: string
    /** 是否显示取消按钮 */
    showCancel?: boolean
    /** 取消按钮文本 */
    cancelText?: string
    /** 取消按钮字体颜色 */
    cancelColor?: string
    /** 确定按钮文本 */
    confirmText?: string
    /** 确定按钮字体颜色 */
    confirmColor?: string
}

/** dialog控制器 */
interface IDialogControl {
    /** 常规化配置 */
    show(options: IDialogBase): Promise<undefined>

    /** 无cancel，confirmText为"确定" */
    showContent(content: string, title?: string): Promise<undefined>

    /** 带cancel，confirmText为"确定"，cancelText为“取消” */
    showCancel(content: string, title?: string): Promise<undefined>
}

interface IDialogSync extends IBaseState, IDialogBase, IVisible, IController<IDialogControl> {
    onCancel?: Function
    onConfirm?: Function
}

