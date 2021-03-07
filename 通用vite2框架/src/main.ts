import "windi.css";

import { createApp } from 'vue';
import App from './App.vue';

import router, { setupRouter } from '/@/router';

import { isDevMode } from '/@/utils/env';

(async () => {
    const app = createApp(App);

    // 注册全局组件
    // registerGlobComp(app);

    // 初始化路由
    setupRouter(app);

    await Promise.all([
        // 保证路由初始化成功
        router.isReady(),
    ]);

    app.mount('#app', true);

    // The development environment takes effect
    if (isDevMode()) {
        app.config.performance = true;
        window.__APP__ = app;
    }
})();