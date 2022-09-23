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

interface ILoading {
    show()

    show(msg: string)

    hide()
}
