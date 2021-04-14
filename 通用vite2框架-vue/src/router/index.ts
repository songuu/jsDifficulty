import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import { basicRoutes, LoginRoute } from './routers';

import { REDIRECT_NAME } from './constant';

const WHITE_NAME_LIST = [LoginRoute.name, REDIRECT_NAME];

/* 
* 需要区分的是history和hash模式
* createWebHashHistory   
* createWebHistory 需要传入根路径
*/
const VITE_PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH;

const router = createRouter({
    history: createWebHistory((VITE_PUBLIC_PATH as string)),
    routes: (basicRoutes as unknown) as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 重置路由
export function resetRouter() {
    router.getRoutes().forEach((route) => {
        const { name } = route;
        if (name && !WHITE_NAME_LIST.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
}

// 初始化路由
export function setupRouter(app: App<Element>) {
    app.use(router);
}

export default router;