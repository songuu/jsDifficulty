/*
 * @Author: songyu
 * @Date: 2021-06-30 17:42:37
 * @LastEditTime: 2021-06-30 17:43:44
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\通用vite2框架-vue\src\router\guard\messageGuard.ts
 */
import type { Router } from 'vue-router';
import projectSetting from '/@/settings/projectSetting';

/**
 * 路由切换，清楚所有的提示
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting;

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
      }
    } catch (error) {
      console.log('message guard error:' + error);
    }
    return true;
  });
}
