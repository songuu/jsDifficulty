import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
    path: '/home',
    name: 'Home',
    component: LAYOUT,
    meta: {
        icon: '',
        title: "首页",
    }
};

export default dashboard;
