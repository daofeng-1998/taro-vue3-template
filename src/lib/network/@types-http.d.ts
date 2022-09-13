export namespace HttpRequest {

    /** 请求头 */
    interface IHeader {
        /** 请求内容类型 */
        'content-type'
    }

    type IAnyObject = Record<keyof IHeader | string, any>

    interface Method {
        /** HTTP 请求 OPTIONS */
        OPTIONS
        /** HTTP 请求 GET */
        GET
        /** HTTP 请求 HEAD */
        HEAD
        /** HTTP 请求 POST */
        POST
        /** HTTP 请求 PUT */
        PUT
        /** HTTP 请求 DELETE */
        DELETE
        /** HTTP 请求 TRACE */
        TRACE
        /** HTTP 请求 CONNECT */
        CONNECT
    }

    interface IBasicOptions {
        /** 超时时间 */
        timeout?: number,
        /** 请求头 */
        header?: IAnyObject,
        /** 请求方法 */
        method?: keyof Method,
    }

    interface IDefaultOptions extends IBasicOptions {
        url?: string,
    }

    interface IRequestOptions extends IBasicOptions {
        url: string,
    }


    interface IRequestResult {
        /** 错误信息 */
        errMsg: string
    }

    interface ISuccessResult<T extends string | TaroGeneral.IAnyObject | ArrayBuffer = any> extends IRequestResult {
        /** 开发者服务器返回的数据 */
        data: T
        /** 开发者服务器返回的 HTTP Response Header */
        header: IAnyObject
        /** 开发者服务器返回的 HTTP 状态码 */
        statusCode: number
        /** 调用结果 */
        errMsg: string
        /** cookies */
        cookies?: string[]
    }


    interface IRequestMiddle {
        (request: IRequestOptions, next: Function)
    }

    interface IResponseMiddle {
        (response: ISuccessResult, next: Function)
    }
}
