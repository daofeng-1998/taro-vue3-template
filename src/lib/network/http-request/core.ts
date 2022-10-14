import type { HttpRequest } from '@/lib/network/http-request/http-request';
import Interceptor from '@/lib/network/http-request/interceptor';
import { HttpError } from '@/lib/network/http-request/errors/http-error';
import qs from '@/lib/query-string/qs';

type Response = string | HttpRequest.IAnyObject | ArrayBuffer;
type MethodOptions = HttpRequest.IRequestMethodOptions;

export class Core {
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
        request: new Interceptor(),
        /** 响应拦截器 */
        response: new Interceptor(),
    };

    /**
     * 默认配置
     */
    public default: Partial<HttpRequest.IDefaultOptions> = {
        filterEmpty: true,
        timeout: 10000,
    };

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

        return new Core(adaptor);
    }

    /**
     * 发起通用请求
     * @param options
     */
    public request = <R extends Response>(options: HttpRequest.IRequestOptions): Promise<HttpRequest.ISuccessResult<R>> => {
        /** 最终请求配置信息 */
        const finalOptions = {
            ...this.default, // 默认配置
            ...this.initRequestOptions(options), // 本次请求的配置，覆盖默认配置

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
    };

    /**
     * 发起get请求
     * @param url
     * @param options
     */
    public get = <R extends Response>(url: string, options?: MethodOptions): Promise<HttpRequest.ISuccessResult<R>> => {
        return this.request({
            ...options,
            url,
            method: 'GET',
        } as HttpRequest.IRequestOptions);
    };

    /**
     * 发起通用POST请求
     * @param url
     * @param options
     */
    public post = <R extends Response>(url: string, options?: MethodOptions): Promise<HttpRequest.ISuccessResult<R>> => {
        return this.request({
            ...options,
            url,
            method: 'POST',
        } as HttpRequest.IRequestOptions);
    };

    /**
     * 发起通用PUT请求
     * @param url
     * @param options
     */
    public put = <R extends Response>(url: string, options?: MethodOptions): Promise<HttpRequest.ISuccessResult<R>> => {
        return this.request({
            ...options,
            url,
            method: 'PUT',
        } as HttpRequest.IRequestOptions);
    };

    /**
     * 发起通用DELETE请求
     * @param url
     * @param options
     */
    public delete = <R extends Response>(url: string, options?: MethodOptions): Promise<HttpRequest.ISuccessResult<R>> => {
        return this.request({
            ...options,
            url,
            method: 'DELETE',
        } as HttpRequest.IRequestOptions);
    };

    private initRequestOptions = (options: HttpRequest.IRequestOptions) => {
        const newOptions = Object.assign({}, options);

        const url = newOptions.url;

        newOptions.url = url.includes('://')
            ? url
            : (this.default?.baseUrl || '').concat(url);

        if (typeof newOptions.params === 'object') {
            const queryString = qs.stringify(newOptions.params);

            if (queryString.length > 0) {
                newOptions.url = newOptions.url
                    .concat(newOptions.url.endsWith('?') ? '' : '?')
                    .concat(queryString);
            }
        }

        return newOptions;
    };

    /**
     * 派发实际请求，通过提供的适配器
     * @param options
     * @private
     */
    private dispatchRequest = (options: HttpRequest.IRequestOptions): Promise<HttpRequest.ISuccessResult | HttpError> => {
        return this.adaptor(options)
            .then((res) => {
                res.options = options;
                return res;
            }).catch((error) => {
                const httpError = new HttpError(error.errMsg);
                httpError.options = options;
                return httpError;
            });
    };
}
