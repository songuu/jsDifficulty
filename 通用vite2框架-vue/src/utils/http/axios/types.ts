import type { AxiosRequestConfig } from 'axios';
import type { AxiosTransform } from './axiosTransform';
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // 拆分请求参数到url里面
  joinParamsToUrl?: boolean;
  // 格式化请求里面的时间
  formatDate?: boolean;
  //  是否处理请求结果
  isTransformRequestResult?: boolean;
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse?: boolean;
  // 是否加入url
  joinPrefix?: boolean;
  // 请求地址设置
  apiUrl?: string;
  // 错误信息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 是否加入时间戳
  joinTime?: boolean;
  // 是否支持取消请求
  ignoreCancelToken?: boolean;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning' | '';
  message: string;
  result: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Indexable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
