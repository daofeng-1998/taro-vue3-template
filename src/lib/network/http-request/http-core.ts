import type { HttpRequest } from '@/lib/network/http-request/http-request';
import HttpInterceptor from '@/lib/network/http-request/http-interceptor';
import { HttpError } from '@/lib/network/http-request/errors/http-error';

type Response = string | HttpRequest.IAnyObject | ArrayBuffer;

export class HttpCore {
    /**
     * 请求适配器，默认为Taro.request
     * @private
     */
    private readonly adaptor: HttpRequest.IAdaptor;

    /**
     * 拦截器
     * */
    public interceptor = {
        /** 请求拦截器 */
        request: new HttpInterceptor(),
        /** 响应拦截器 */
        response: new HttpInterceptor(),
    };

    /**
     * 默认配置
     */
    public default: HttpRequest.IDefaultOptions = {} as HttpRequest.IDefaultOptions;

    private constructor(adaptor: HttpRequest.IAdaptor) {
        this.adaptor = adaptor;
    }

    /**
     * 创建一个Http请求实例对象
     * @param adaptor
     */
    public static create(adaptor: HttpRequest.IAdaptor) {
        if (!adaptor || typeof adaptor !== 'function')
            throw new TypeError('adaptor is not a function');

        return new HttpCore(adaptor);
    }

    /**
     * 发起通用请求
     * @param options
     */
    public request<R extends Response>(options: HttpRequest.IRequestOptions): Promise<HttpRequest.ISuccessResult<R>> {
        let url = options.url;
        url = url.includes('://')
            ? url
            : (this.default?.baseUrl || '').concat(url);

        /** 最终请求配置信息 */
        const finalOptions = {
            ...this.default, // 默认配置
            ...options, // 本次请求的配置，覆盖默认配置
            url, // 这个url会覆盖掉前面配置中的url
        };
        if (!finalOptions.method)
            finalOptions.method = 'GET';

        let promise = Promise.resolve(finalOptions); // 链条第一环，传入请求配置信息

        // 连上请求拦截器
        this.interceptor.request.each((handle) => {
            // @ts-ignore
            promise = promise.then(handle.fulfilled, handle.rejected);
        });

        // 请求
        promise = promise.then(this.dispatchRequest.bind(this));

        // 连接上响应拦截器
        this.interceptor.response.each((handle) => {
            // @ts-ignore
            promise = promise.then(handle.fulfilled, handle.rejected);
        });

        // @ts-ignore
        return promise;
    }

    /**
     * 发起get请求
     * @param url
     * @param options
     */
    public get<R extends Response>(url: string, options?: HttpRequest.IBasicOptions): Promise<HttpRequest.ISuccessResult<R>> {
        return this.request({
            ...options,
            url,
            method: 'GET',
        } as HttpRequest.IRequestOptions);
    }

    /**
     * 发起通用POST请求
     * @param url
     * @param options
     */
    public post<R extends Response>(url: string, options?: HttpRequest.IBasicOptions): Promise<HttpRequest.ISuccessResult<R>> {
        return this.request({
            ...options,
            url,
            method: 'POST',
        } as HttpRequest.IRequestOptions);
    }

    /**
     * 发起通用PUT请求
     * @param url
     * @param options
     */
    public put<R extends Response>(url: string, options?: HttpRequest.IBasicOptions): Promise<HttpRequest.ISuccessResult<R>> {
        return this.request({
            ...options,
            url,
            method: 'PUT',
        } as HttpRequest.IRequestOptions);
    }

    /**
     * 发起通用DELETE请求
     * @param url
     * @param options
     */
    public delete<R extends Response>(url: string, options?: HttpRequest.IBasicOptions): Promise<HttpRequest.ISuccessResult<R>> {
        return this.request({
            ...options,
            url,
            method: 'DELETE',
        } as HttpRequest.IRequestOptions);
    }

    /**
     * 派发实际请求，通过提供的适配器
     * @param options
     * @private
     */
    private dispatchRequest(options: HttpRequest.IRequestOptions): Promise<HttpRequest.ISuccessResult | HttpError> {
        return this.adaptor(options)
            .then((res) => {
                res.options = options;
                return res;
            }).catch((error) => {
                const httpError = new HttpError(error.errMsg);
                httpError.options = options;
                return httpError;
            });
    }
}
