import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

// import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '../constant';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];


import { PageEnum } from '/@/enums/pageEnum';

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});

// export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: 'Root',
    },
};

export const basicRoutes = [RootRoute];
