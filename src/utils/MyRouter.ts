import Taro from '@tarojs/taro';
import type { Router } from '@/utils/utils';
import cache from '@/utils/Cache';
import { asyncBack, asyncGo, asyncRedirect, asyncRelunch, asyncTab } from '@/utils/AsyncAPI';

export const ROUTE_PARAMS_KEY = 'ROUTE_PARAMS_KEY';

/**
 * 获取当前页面
 */
const getCurrentPath = (): string | undefined => Taro.getCurrentInstance().router?.path;

/**
 * 路由钩子
 */
const hooks: Array<Router.Hook> = [];

/**
 * 挂载钩子函数
 * @param func
 */
const hook = <R>(func: (url?: string) => Promise<R>) => {
    return <D extends object>(url: string, data?: D): Promise<R> => {
        const currentPath = getCurrentPath();
        console.log(`跳转：${url}`);

        return new Promise<R>((resolve, reject) => {
            let i = 0;

            const check = () => {
                if (i >= hooks.length) {
                    if (url.includes('?'))
                        url = url.concat(`${url.endsWith('&') ? '' : '&'}${ROUTE_PARAMS_KEY}=${cache.set(data)}`);
                    else
                        url = url.concat(`?${ROUTE_PARAMS_KEY}=${cache.set(data)}`);

                    console.log(url);
                    return func(url).then(resolve).catch(reject);
                }// 已经没有钩子了，调用原函数

                hooks[i++](currentPath, url, (url: string) => {
                    if (url) {
                        // @ts-ignore
                        go(url).then(resolve).catch(reject);
                    } else {
                        check();
                    }
                });
            };

            check();
        });
    };
};

/**
 * 添加钩子
 * @param hook
 */
export const addRouterHook = (hook: Router.Hook) => {
    hooks.push(hook);
    const currentPath = getCurrentPath();
    hook(undefined, currentPath as string, url => url && go(url));
};

/**
 * 跳转到指定页面
 * @param url
 */
export const go = hook((url: string) => {
    return asyncGo({ url });
});

/**
 * 回退
 * @param count
 */
export const back = (count: number) => {
    return asyncBack({ delta: count });
};

/**
 * 重定向
 * @param url
 */
export const redirect = hook((url: string) => {
    return asyncRedirect({ url });
});

/**
 * 关闭全部页面打开指定页面
 * @param url
 */
export const launch = hook((url: string) => {
    return asyncRelunch({ url });
});

/**
 * 跳转到tab页
 * @param url
 */
export const tab = hook((url: string) => {
    return asyncTab({ url });
});

export const goAny = <D extends object>(url: string, data?: D) => {
    go(url, data)
        .catch(() => tab(url, data))
        .catch(() => redirect(url, data));
};
