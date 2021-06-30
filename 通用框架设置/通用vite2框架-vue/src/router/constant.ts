/*
 * @Author: songyu
 * @Date: 2021-03-07 18:58:46
 * @LastEditTime: 2021-06-30 17:44:37
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\通用vite2框架-vue\src\router\constant.ts
 */
export const REDIRECT_NAME = 'Redirect';
export const PAGE_NOT_ACCESS = 'PageNotAccess';
export const PAGE_NOT_FOUND = 'PageNotFound';

/**
 * @description: 默认界面
 */
export const LAYOUT = () => import('/@/layouts/index.vue');

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const EXCEPTION_COMPONENT = () => import('../views/exception/index.vue');

/**
 * @description: 存在中间模块界面
 */
export const getParentLayout = (_name?: string) => {
    return () =>
        new Promise((resolve) => {
            resolve({
                name: PARENT_LAYOUT_NAME,
            });
        });
};
