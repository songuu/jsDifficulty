import type { Router } from 'vue-router';

import { PAGE_NOT_FOUND, PAGE_NOT_ACCESS } from '/@/router/constant';

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 直接到的是404界面 或者 403界面
    if (to.name === PAGE_NOT_FOUND || to.name === PAGE_NOT_ACCESS) {
      next();
      return;
    }

    const token = localStorage.getItem("authorization")

    if (!token) {
      if (
        to.meta.ignoreAuth
      ) {
        next();
        return;
      }
      next(PAGE_NOT_ACCESS);
      return;
    }
    next();
  });
}
