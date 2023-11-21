export type EnvName = 'development' | 'beta' | 'production' | 'preview'

interface BaseConfig {
  cdn?: string
  apiBaseUrl?: string
}

type Config = {
  [key in EnvName]?: BaseConfig
}

const config: Config = {
  // 开发环境配置
  development: {
    cdn: './',
    apiBaseUrl: '',
  },
  // 生产环境配置
  production: {
    cdn: '/',
    apiBaseUrl: '',
  },
}

export default config
