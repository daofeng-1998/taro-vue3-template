import Taro from "@tarojs/taro";
import type { HttpRequest } from "@/lib/network/http-request/@types-http";
import HttpInterceptor from "@/lib/network/http-request/http-interceptor";
import { HttpError } from "@/lib/network/http-request/errors/http-error";


class HttpCore {
    public interceptor = {
        request: new HttpInterceptor(),
        response: new HttpInterceptor()
    };


    /**
     * 默认配置
     */
    public default: HttpRequest.IDefaultOptions = {} as HttpRequest.IDefaultOptions;

    private dispatchRequest(options: HttpRequest.IRequestOptions): Promise<HttpRequest.ISuccessResult> {
        return new Promise((resolve, reject) => {
            Taro.request({
                ...options,
                success: (res: HttpRequest.ISuccessResult) => {
                    res.options = options;
                    resolve(res);
                },
                fail: error => {
                    const httpError = new HttpError(error.errMsg);
                    httpError.options = options;
                    reject(httpError);
                }
            });
        });
    }

    /**
     * 发起通用请求
     * @param options
     */
    public request(options: HttpRequest.IRequestOptions): Promise<HttpRequest.ISuccessResult | any> {


        let url = options.url;
        url = url.includes('://')
            ? url
            : (this.default.baseUrl || '').concat(url);

        /**
         * 最终请求配置信息
         */
        const finalOptions = {
            ...this.default, // 默认配置
            ...options, // 本次请求的配置，覆盖默认配置
            url, // 这个url会覆盖掉前面配置中的url
        };
        if (!finalOptions.method) finalOptions.method = 'GET';

        /** 请求钩子链 */
        const requestInterceptorChain: Array<Function> = [];
        this.interceptor.request.forEach(handle => {
            requestInterceptorChain.push(handle.fulfilled, <Function>handle.rejected);
        });

        /** 响应钩子链 */
        const responseInterceptorChain: Array<Function> = [];
        this.interceptor.response.forEach(handle => {
            responseInterceptorChain.push(handle.fulfilled, <Function>handle.rejected);
        });

        // 第一个就是.then的第一个参数，也就是前面的钩子都走完了且没有reject，则会发起请求
        const chain = [
            ...requestInterceptorChain,
            this.dispatchRequest,
            undefined,
            ...responseInterceptorChain
        ];


        let promise = Promise.resolve(finalOptions); // 链条第一环，传入请求配置信息

        let i = 0;
        const len = chain.length;

        while (i < len) {
            // @ts-ignore
            promise = promise.then(chain[i++], chain[i++]);
        }

        return promise;
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

}

/**
 * 创建一个http请求实例对象
 */
export const createHttp = () => {
    return new HttpCore();
};
