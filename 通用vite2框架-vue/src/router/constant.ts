export const REDIRECT_NAME = 'Redirect';

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
