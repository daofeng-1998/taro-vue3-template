import { NavigateType, Router } from 'tarojs-router-next';
import type { NavigateOptions } from 'tarojs-router-next/src/router/type';

/**
 * 跳转tab优先
 * @param url
 * @param options
 */
export const switchAny = (url: string, options?: Omit<NavigateOptions, 'type'>) => {
    return Router.navigate({ url }, {
        type: NavigateType.switchTab,
        ...options,
    }).catch(() => {
        return Router.navigate({ url }, {
            type: NavigateType.redirectTo,
            ...options,
        });
    }).catch(() => {
        return Router.navigate({ url }, {
            type: NavigateType.navigateTo,
            ...options,
        });
    });
};

/**
 * 重定向优先
 * @param url
 * @param options
 */
export const redirectAny = (url: string, options?: Omit<NavigateOptions, 'type'>) => {
    return Router.navigate({ url }, {
        type: NavigateType.redirectTo,
        ...options,
    }).catch(() => {
        return Router.navigate({ url }, {
            type: NavigateType.switchTab,
            ...options,
        });
    }).catch(() => {
        return Router.navigate({ url }, {
            type: NavigateType.navigateTo,
            ...options,
        });
    });
};

/**
 * 普通导航优先
 * @param url
 * @param options
 */
export const navigateAny = (url: string, options?: Omit<NavigateOptions, 'type'>) => {
    return Router.navigate({ url }, {
        type: NavigateType.navigateTo,
        ...options,
    }).catch(() => {
        return Router.navigate({ url }, {
            type: NavigateType.switchTab,
            ...options,
        });
    }).catch(() => {
        return Router.navigate({ url }, {
            type: NavigateType.redirectTo,
            ...options,
        });
    });
};
