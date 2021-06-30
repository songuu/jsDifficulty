/**
 * @description: 错误状态枚举
 */
export enum ExceptionEnum {
  // 没有权限
  PAGE_NOT_ACCESS = 403,

  // 没有找到界面
  PAGE_NOT_FOUND = 404,

  // 服务器错误
  ERROR = 500,

  // 网络错误
  NET_WORK_ERROR = 10000,
}

export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise',
}
