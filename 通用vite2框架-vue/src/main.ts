import "windi.css";

import { createApp } from 'vue';
import App from './App.vue';

import router, { setupRouter } from '/@/router';

import { setupStore } from '/@/store';

import { setupGlobDirectives } from '/@/directives';

import { isDevMode } from '/@/utils/env';

(async () => {
    const app = createApp(App);

    // 注册全局组件
    // registerGlobComp(app);

    // 初始化路由
    setupRouter(app);

    // 初始化stores
    setupStore(app);

    // 初始化全局指令
    setupGlobDirectives(app);

    // 保证路由初始化成功
    await router.isReady();

    app.mount('#app', true);

    // 生产环境
    if (isDevMode()) {
        // app.config.performance = true;
        window.__APP__ = app;
    }
})();