# Vue3 + Typescript + Vite2

## 目录解释

1. build 全局项目配置
 1. config目录 配置全局的样式和主题
 2. script目录 打包和启动命令的配置
 3. vite目录 vite相关的配置(类似于webpack的配置)
 4. constant.ts 全局静态变量
 5. utils.ts 框架配置工具类
2. public
3. src
  1. api 全局api管理
  2. assets 静态资源的管理
  3. components 通用组件管理
  4. directives 全局指令的管理[主要是loading指令]
  5. enums 全局静态变量的枚举[请求状态，页面配置，页面字体大小配置]
  6. hooks 全局钩子函数的管理(hooks统一管理)
    1. core 核心钩子函数 [函数防抖，函数节流，复制节点属性]
    2. setting 页面设置钩子函数
    3. web 页面钩子函数[复制到剪贴版，使用页面水印，区域点击关闭]
    4. event 事件钩子函数[滚动，滚动到，事件监听]
  7. layouts 页面主要布局[主页面框架]
  8. router 页面路由管理
  9. store vuex store 管理
  10. utils 页面工具类的管理
    1. http目录 axios请求管理
    2. env.ts 环境变量管理
    3. is.ts 类型判断管理
    4. propTypes.ts props传入类型的管理
  11. 页面主要页面实现
4. types 全局的环境变量的配置[config.d.ts]

## plugin-legacy
装饰器的使用
## windi.css
主要是用在 直接使用定义好的样式
来源于Tailwind.css

## inheritAttrs
子组件是否继承父组件的属性，但是在this.$attrs中都可以获取
