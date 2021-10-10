import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message, Modal } from 'antd'
import store from 'store/index'
import { logout } from 'store/actions'
import config, { EnvName } from 'root/config'

function dispatchLogout() {
  Modal.confirm({
    title: '确认登出?',
    content: '你已被登出，可以取消继续留在该页面，或者重新登录',
    okText: '重新登录',
    cancelText: '取消',
    onOk: () => {
      // 清除登录信息
      store.dispatch<any>(logout())
    },
    onCancel: () => {
      console.log('Cancel')
    },
  })
}

/** 环境变量 */
const MODE = import.meta.env.MODE as EnvName

const base = config[MODE]

const defaultUrl =
  MODE === 'development'
    ? 'http://localhost:5001'
    : process.env.VITE_APP_API_URL

// 创建axios的实例
const service = axios.create({
  baseURL: base ? base.apiBaseUrl : defaultUrl,
  timeout: 30000,
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求携带凭证
    const token = store.getState().user.token

    if (token) {
      config.headers.Authorization = token
    }

    // * https://blog.csdn.net/qq_37825370/article/details/113928109 解决axios删除Content-Type的问题
    if (!config.data) {
      config.data = ''
    }

    config.headers['Content-Type'] = 'application/json'

    return config
  },
  error => Promise.reject(error),
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.code !== 1) {
      message.error(res.msg || '网络错误')
      return Promise.reject(res.msg || 'Error')
    } else {
      return response
    }
  },
  (error: AxiosError) => {
    const response = error.response
    const data = response && response.data
    if (response) {
      switch (response.status) {
        case 400:
          error.message = data.msg || '错误请求'
          break
        case 401:
          error.message = data.msg || 'token失效，请重新登录'
          break
        case 403:
          error.message = data.msg || '非法token，拒绝访问'
          dispatchLogout()
          break
        case 404:
          error.message = data.msg || '请求错误，资源找不到了'
          break
        case 408:
          error.message = data.msg || '请求超时'
          break
        case 500:
          error.message = data.msg || '服务器错误'
          break
        default:
          error.message = data.msg || '连接错误'
      }
    } else {
      if (!window.navigator.onLine) {
        error.message = '网络中断'
      }
    }
    message.error(error.message)
    return Promise.reject(error)
  },
)

/** 封装request请求方法 */
function request<T = any>(config: AxiosRequestConfig) {
  return service.request<any, AxiosResponse<T>>(config)
}

export default request
