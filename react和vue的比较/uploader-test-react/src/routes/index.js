import loadable from '@/utils/loadable'

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

// 关于
const About = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/About'))

// 综合界面
const Home = loadable(() => import(/* webpackChunkName: 'Home' */ '@/views/Home'))

const routes = [
    { path: '/index', exact: true, name: 'Index', component: Index},
    { path: '/home', exact: false, name: '首页', component: Home},
    { path: '/about', exact: false, name: '关于', component: About}
]

export default routes
