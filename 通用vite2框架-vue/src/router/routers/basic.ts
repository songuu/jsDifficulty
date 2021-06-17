/*
 * @Author: songyu
 * @Date: 2021-06-17 15:07:01
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-17 16:06:51
 */
import type { AppRouteRecordRaw } from '/@/router/types';
import { REDIRECT_NAME, LAYOUT, EXCEPTION_COMPONENT } from '/@/router/constant';

// 404界面
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: LAYOUT,
  meta: {
    title: 'ErrorPage'
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPage',
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage'
      },
    },
  ],
};

// 重定向界面
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  name: REDIRECT_NAME,
  component: LAYOUT,
  meta: {
    title: REDIRECT_NAME,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('/@/views/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
      },
    },
  ],
};
