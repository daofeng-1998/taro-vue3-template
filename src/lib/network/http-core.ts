import Taro from "@tarojs/taro";
import { HttpRequest } from "@/lib/network/@types-http";


class HttpCore {

    /**
     * 请求钩子
     * @private
     */
    private requestMiddles: Array<HttpRequest.IRequestMiddle> = [];

    /**
     * 响应钩子
     * @private
     */
    private responseMiddles: Array<HttpRequest.IResponseMiddle> = [];

    /**
     * 默认配置
     */
    public default: HttpRequest.IDefaultOptions = {} as HttpRequest.IDefaultOptions;

    /**
     * 发起通用请求
     * @param options
     */
    public request(options: HttpRequest.IRequestOptions): Promise<HttpRequest.ISuccessResult> {


        return new Promise((resolve, reject) => {

            let url = options.url;
            url = url.includes('://')
                ? url
                : (this.default.url || '').concat(url);

            /**
             * 最终请求配置信息
             */
            const finalOptions = {
                ...this.default, // 默认配置
                ...options, // 本次请求的配置，覆盖默认配置
                url, // 这个url会覆盖掉前面配置中的url
            };
            if (!finalOptions.method) finalOptions.method = 'GET';


            let reqIndex = 0;
            const checkRequestMiddle = () => {
                if (reqIndex >= this.requestMiddles.length) return;

                const reqMiddle = this.requestMiddles[reqIndex++];

                reqMiddle(finalOptions, (error) => {
                    error ? reject(error) : checkRequestMiddle();
                });
            };
            checkRequestMiddle();


            // 本次请求的配置高于默认配置
            Taro.request({
                ...finalOptions,
                success: function checkResponseMiddle(response, resIndex = 0) {

                    if (resIndex >= this.responseMiddles.length) {
                        return resolve(response);
                    }

                    const reqMiddle = this.responseMiddles[resIndex];
                    reqMiddle(response, (error) => {
                        error instanceof Error
                            ? reject(error)
                            : checkResponseMiddle.call(this, error, resIndex + 1);
                    });

                }.bind(this),
                fail: reject
            });
        });
    }

    /**
     * 发起get请求
     * @param url
     * @param options
     */
    public get(url: string, options?: HttpRequest.IBasicOptions): Promise<HttpRequest.ISuccessResult> {
        return this.request({
            ...options,
            url,
            method: 'GET'
        } as HttpRequest.IRequestOptions);
    }

    /**
     * 发起通用POST请求
     * @param url
     * @param options
     */
    public post(url: string, options?: HttpRequest.IBasicOptions): Promise<HttpRequest.ISuccessResult> {
        return this.request({
            ...options,
            url,
            method: 'POST'
        } as HttpRequest.IRequestOptions);
    }

    /**
     * 添加请求钩子
     * @param func
     */
    public useRequest(func: HttpRequest.IRequestMiddle): void {
        this.requestMiddles.push(func);
    }

    /**
     * 添加响应钩子
     * @param func
     */
    public useResponse(func: HttpRequest.IResponseMiddle): void {
        this.responseMiddles.push(func);
    }

}

/**
 * 创建一个http请求实例对象
 */
export const createHttp = () => {
    return new HttpCore();
};
