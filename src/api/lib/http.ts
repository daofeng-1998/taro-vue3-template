import { createHttp } from "@/lib/network/http-request/http-core";
import type { HttpRequest } from "@/lib/network/http-request/@types-http";
import { HttpError } from "@/lib/network/http-request/errors/http-error";
import { AsyncRequest } from "@/utils/AsyncAPI";

const http = createHttp(AsyncRequest as HttpRequest.IAdaptor);

http.default = {
    baseUrl: 'https://www.baidu.com'
};

http.interceptor.request.use((options: HttpRequest.IRequestOptions) => {
    console.log('-------------请求钩子1 fulfilled');
    !options.header && (options.header = {});

    // options.url = 'https://www.baidu.com/111111.html';

    options.header["token"] = '123';

    console.log(options);
    return options;

});

http.interceptor.request.use((value: HttpRequest.IRequestOptions) => {
    console.log('-------------请求钩子2 fulfilled');

    value.header!['sign'] = '456';

    console.log(value);
    return value;

});

http.interceptor.response.use(async (response: HttpRequest.ISuccessResult) => {
    console.log(response.statusCode);
    if (response.statusCode !== 200) {
        const res = await http.get('https://www.baidu.com');
        console.log('拦截器内访问');
        console.log(res);
        return Promise.reject(new HttpError('状态码异常', response.options));
    }
    return response;
});

http.interceptor.response.use((value: HttpRequest.ISuccessResult) => {
    console.log('-------------响应钩子1 fulfilled');
    console.log(value);

    return value;

}, (error: HttpError) => {

    console.log('-------------响应钩子1 rejected');
    console.log('发生了异常');
    console.dir(error);

    return Promise.reject(error);
});

export default http;
