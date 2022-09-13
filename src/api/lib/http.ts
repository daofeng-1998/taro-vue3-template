import { createHttp } from "@/lib/network/http-core";


const http = createHttp();

http.default = {
    header: {
        "content-type": 'application/json'
    },
};

http.useRequest((request, next) => {
    console.log('请求钩子', request);
    next(); // 放行
});

http.useResponse((response, next) => {

    response.data = '来到了相应钩子1';

    setTimeout(() => {
        next(response);
    }, 2000);

});

http.useResponse((response, next) => {

    response.data = '来到了相应钩子2';
    next(response);
});

http.useResponse((response, next) => {

    response.data = { msg: '响应钩子3' };
    next(response);
});

export default http;
