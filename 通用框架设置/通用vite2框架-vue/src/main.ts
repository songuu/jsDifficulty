/*
 * @Author: songyu
 * @Date: 2021-06-17 15:00:01
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-30 17:47:04
 */
import "windi.css";

import { createApp } from 'vue';
import App from './App.vue';

import router, { setupRouter } from '/@/router';

import  {setupRouterGuard} from "/@/router/guard"

import { setupStore } from '/@/store';

import { setupI18n } from '/@/locales/setupI18n';

import { setupGlobDirectives } from '/@/directives';

import { isDevMode } from '/@/utils/env';

import { registerGlobComp } from '/@/components/registerGlobComp';


(async () => {
    const app = createApp(App);

    // 注册全局组件
    registerGlobComp(app);

    // 初始化路由
    setupRouter(app);

    // 注册路由拦截器
    setupRouterGuard(app);

    // 初始化stores
    setupStore(app);

    // 初始化全局指令
    setupGlobDirectives(app);

    // 保证路由初始化成功
    // await router.isReady();

    app.mount('#app', true);
})();