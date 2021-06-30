/*
 * @Author: songyu
 * @Date: 2021-06-30 17:42:37
 * @LastEditTime: 2021-06-30 17:47:39
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\通用vite2框架-vue\src\router\guard\index.ts
 */
import { Router } from 'vue-router';

import { createPermissionGuard } from './permissionGuard';
import { createMessageGuard } from './messageGuard';
import { createHttpGuard } from './httpGuard';

export function setupRouterGuard(router: Router) {
  createHttpGuard(router);
  createMessageGuard(router);
  createPermissionGuard(router);
}
