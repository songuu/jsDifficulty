### 销售后台系统

初始化脚手架使用`react-create-app`初始化,相关文档参见[react-create-app](https://facebook.github.io/create-react-app/docs/getting-started)

#### 使用

```$xslt
git clone git@git.meiqia.com:livechat/salesadmin-fe.git
npm install
```

#### 本地 server 启动方法

如果需要修改接口域名，请修改`.env-cmdrc`文件下相应环境配置

```$xslt
npm run start
```

#### 打包发布

##### 1.发布到 dev 服务器

```$xslt
上跳板机 -> 上app-04 -> 切换用户($ sudo su meiqia) -> 切换到文件夹 /data/apps
-> git pull (如果没有的要clone) -> npm install -> npm run build命令
-> 重启nginx
```

`npm run build:dev` 为构建 dev 环境包命令

`npm run build:pro` 为构建生产环境包命令

打包完成后会增加一个`dist`文件夹，里面包含所有的 html 文件以及 js 文件，只需要用`nginx`映射到`index.html`即可启动

##### 2.发布到生产环境

项目新开时，需要到运维申请`hub.meiqia.com` -> `livechat` 命名空间下单独的仓库，并且修改 `.gitlab-ci.yml` 文件中`DOCKER_IMAGE_NAME`变量为该项目独有镜像，以后打包完成后都会向该仓库提交新的镜像

#### 代码提交

代码提交时会做代码检查以及代码格式化，如果使用`sourcetree`等工具，发现很长时间提交不上去，请查看具体日志

#### 框架及版本

node 版本

-   node 大于 8.0.0

样式

-   postcss

语法规范

-   Airbnb eslint

format

-   prettier

#### 文件目录规范

文件层级遵循以下结构，各功能文件分类至相应文件夹内。

```bash
├── config                    # webpack 配置文件
├── dist                      # 打包完成后的静态文件目录
├── public                    # html 模板
├── scripts                   # 启动脚本文件
├── src
│   ├── components
│   │   └── xxx-xxx
│   │       ├── index.pcss
│   │       └── index.jsx
│   ├── hoc-components
│   │   └── xxx-xxx
│   │       ├── index.pcss
│   │       └── index.jsx
│   ├── module-components
│   │   └── xxx-xxx
│   │       ├── index.pcss
│   │       └── index.jsx
│   ├── language
│   │   ├── en
│   │   │   └── en.json
│   │   └── zh
│   │      └── zh.json
│   ├── routes
│   │   └── index.jsx
│   ├── images
│   ├── store
│   │   ├── index.js
│   │   ├── reducers.js
│   │   └── xxx.js
│   ├── style
│   │   ├── base
│   │   │   └── base.pcss
│   │   └── main.pcss
│   ├── utils
│   │   ├── utils.js
│   ├── i18n.js
│   ├── index.js
│   └── main.js
├── webpack
├── .babelrc
├── .env-cmdrc               # 环境配置文件，主要正对于域名的配置
├── .eslintignore            # eslint 屏蔽检测文件，不需要检测的文件夹配置
├── .eslintrc.json           # eslint 配置
├── .gitignore               # git 忽略文件
├── .gitlab-ci.yml           # gitlab-ci 配置文件
├── .prettierrc.json         # prettier 配置文件
├── package.json
├── postcss.config.js
└── .readme.md
```

#### 组件编写

##### hoc-component

高阶组件

```bash
 hoc-component
   ├── xxx-xxx
   │   ├── index.jsx
   │   └── index.pcss
```

-   代码复用，逻辑抽象，允许与数据层交互。

##### com-component

通用 ui 组件

```bash
 com-component
   ├── xxx-xxx
   │   ├── index.jsx
   │   └── index.pcss
```

-   各个业务组件通用 ui 显示，不允许与数据层进行交互。

##### module-component

业务组件

```bash
 module-component
   ├── xxx-xxx
   │   ├── index.jsx
   │   └── index.pcss
```

-   index.pcss 组件样式文件，负责显示该组件所有样式
-   index.jsx 数据逻辑组件组件，负责处理所有数据层与 ui 层交互。

#### style 编写

```bash
 style
 ├── base
 └── main.pcss
```

-   main.pcss 公共样式统一出口处。
-   base 包含统一样式、各种工具类，禁止添加业务组件样式。
-   各业务组件应优先使用公共样式。

#### 数据层编写

```bash
 store
   ├── index.js      #真正的创建store
   ├── reducers.js   #reducer 集合,combineReducers
   └── xxx.js        #单个的store
```

-   index.js 数据层出口，`redux` 中间件。
-   `reducers` 组合各业务组件数据层。
-   其他文件储存后端接口返回业务数据，只能对数据进行简单组合，禁止修改接口返回数据属性。
-   采用`redux-actions`，单个文件中管理`action`以及`reducer`
