import React, {memo, Suspense, useContext} from 'react'
import {Layout} from 'antd'
import {Switch, Route, Redirect, useLocation} from 'react-router-dom'
import routesConfig, {routeProps} from '@/config/routeMap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Loading from 'comps/Loading'
import {useAppSelector} from 'store/index'
import DocumentTitle from 'react-document-title'
import MenuList from '@/config/menuConfig'
import {getMenuItemInMenuListByProperty} from 'utils/index'
import defaultSettings from '@/defaultSetting'
import {LayoutContext} from '../index'
const {Content} = Layout
import './index.less'

interface ILayoutContentProps {}

const getPageTitle = (value: string): string => {
  const item = getMenuItemInMenuListByProperty(MenuList, 'path', value)
  if (item) {
    return item.title + ' - ' + defaultSettings.title
  }
  return defaultSettings.title
}

const LayoutContent: React.FC<ILayoutContentProps> = () => {
  const location = useLocation()
  // 获取当前用户的权限
  const {perms} = useAppSelector(state => state.app)
  const {routes} = useContext(LayoutContext)

  /**
   * 权限过滤
   * 不需要权限
   * 存在于routes
   * 并且有在perms中可以找到对应的权限
   */
  const filterRoute = (route: routeProps) => {
    return (
      route.notAuth ||
      (routes &&
        routes.find(item => {
          return item.status === 0 && item.path === route.path
        }))
    )
  }

  /** 异步获取到路由前先不渲染页面 */
  if (!routes) {
    return null
  }

  /** 动态获取刚进入页面显示的内容  */
  const getFirstRoute = () => {
    const firstRoute = routes[0]

    if (firstRoute.children && firstRoute.children.length) {
      const ffirstRoute = firstRoute.children[0]
      return ffirstRoute.path
    }

    return firstRoute.path
  }

  return (
    <DocumentTitle title={getPageTitle(location.pathname)}>
      <Content className="layout-content-container">
        <Suspense fallback={<Loading />}>
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              timeout={500}
              classNames="fadeInLeft"
              exit={false}
            >
              <Switch location={location}>
                {routesConfig.map((route, index) => {
                  return filterRoute(route) ? (
                    <Route
                      key={index}
                      path={route.path}
                      exact={!route.noExtra}
                      component={route.component}
                    />
                  ) : null
                })}
                {routes && <Redirect to={getFirstRoute()} from="/" exact />}
                {routes ? (
                  <Redirect to={getFirstRoute()} />
                ) : (
                  <Redirect to="/error/404" />
                )}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Suspense>
      </Content>
    </DocumentTitle>
  )
}

export default memo(LayoutContent)
