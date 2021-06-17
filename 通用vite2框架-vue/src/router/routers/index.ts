/*
 * @Author: songyu
 * @Date: 2021-06-17 15:07:01
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-17 15:25:26
 */
import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];


import { PageEnum } from '/@/enums/pageEnum';

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// * 需要将登录和其他分开
export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: 'Root',
    },
};

export const LoginRoute: AppRouteRecordRaw = {
    path: "/login",
    name: PageEnum.BASE_LOGIN,
    meta: {
        title: '登陆',
        ignoreAuth: false
    }
};

export const basicRoutes = [RootRoute, LoginRoute, REDIRECT_ROUTE];
