import Taro from '@tarojs/taro';

import { Router } from '@/utils/utils';


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
const hook = (func: Function) => {

    return (url: string) => {
        const currentPath = getCurrentPath();

        let i = 0;

        const check = () => {
            if (i >= hooks.length) return func(url); // 已经没有钩子了，调用原函数

            hooks[i++](currentPath, url, (url: string) => url ? go(url) : check());
        };

        return check();
    };
};

/**
 * 添加钩子
 * @param hook
 */
export const addRouterHook = (hook: Router.Hook) => {
    hooks.push(hook);
    const currentPath = getCurrentPath();
    hook(undefined, currentPath as string, (url) => url && go(url));
};

/**
 * 跳转到指定页面
 * @param url
 */
export const go = hook((url: string) => {
    return Taro.navigateTo({ url });
});

/**
 * 回退
 * @param count
 */
export const back = hook((count: number) => {
    return Taro.navigateBack({ delta: count });
});

/**
 * 重定向
 * @param url
 */
export const redirect = hook((url: string) => {
    return Taro.redirectTo({ url });
});

/**
 * 关闭全部页面打开指定页面
 * @param url
 */
export const launch = hook((url: string) => {
    return Taro.reLaunch({ url });
});

/**
 * 跳转到tab页
 * @param url
 */
export const tab = hook((url: string) => {
    return Taro.switchTab({ url });
});

