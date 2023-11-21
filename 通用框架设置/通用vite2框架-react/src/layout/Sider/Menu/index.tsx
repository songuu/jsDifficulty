import React, {memo, useContext, useEffect, useState, useCallback} from 'react'
import {Menu} from 'antd'
import {MenuInfo} from 'rc-menu/lib/interface'
import {Link, useLocation} from 'react-router-dom'
import {MenuListProps, commonMenuList} from '@/config/menuConfig'
import routes, {routeProps} from '@/config/routeMap'
import {useAppDispatch, useAppSelector} from 'store/index'
import {addTagsView} from 'store/actions'
import {getMenuItemInMenuListByProperty} from 'utils/index'
import Scrollbars from 'react-custom-scrollbars'
import Icon from 'comps/Icon'
import variables from 'styles/variables.module.less'
import {LayoutContext} from '../../index'
import './index.less'

interface IMenuProps {}

const MenuContainer: React.FC<IMenuProps> = () => {
  const location = useLocation()
  const sidebarCollapsed = useAppSelector(state => state.app.sidebarCollapsed)
  const dispatch = useAppDispatch()
  const {menus} = useContext(LayoutContext)

  const path: string = location.pathname

  const defaultOpenKeys: string[] = []

  const [menuList, setMenuList] = useState<MenuListProps[]>([])

  useEffect(() => {
    setMenuList(filterMenu(commonMenuList.concat(menus)))
  }, [menus])

  useEffect(() => {
    handleMenuSelecte({})
    const {pathname} = location

    if (pathname === '/') {
      handleMenuSelecte({key: menus[0]?.path})
      return
    }
    handleMenuSelecte({key: location.pathname})
  }, [location, menus])

  /** 过滤菜单 */
  const filterMenu = (menuList: MenuListProps[]): MenuListProps[] => {
    let tempMenuList: MenuListProps[] = []
    menuList.forEach(item => {
      if (item.children && item.children.length > 0) {
        const list = filterMenu(item.children)
        if (list && list.length > 0) {
          item.children = list
          tempMenuList = tempMenuList.concat(item)
        }
      } else {
        tempMenuList = tempMenuList.concat(item)
      }
    })

    return tempMenuList
  }

  /** 生成菜单项 */
  const generatorMenuItem = (item: MenuListProps) => {
    let node = null
    if (item.children && item.children.length > 0) {
      const cItem = item.children.find(c => path.indexOf(c.path) === 0)
      if (cItem) {
        defaultOpenKeys.push(item.path)
      }
      node = (
        <Menu.SubMenu
          title={item.name || item.title}
          key={item.path}
          icon={item.icon && <Icon icon={item.icon as any} />}
        >
          {item.children.map(child => {
            return generatorMenuItem(child)
          })}
        </Menu.SubMenu>
      )
    } else {
      node = (
        <Menu.Item
          key={item.path}
          icon={item.icon && <Icon icon={item.icon as any} />}
        >
          <Link to={item.path}>{item.name || item.title}</Link>
        </Menu.Item>
      )
    }
    return node
  }

  /** 点击侧边栏菜单 */
  const handleMenuSelecte = useCallback((menuInfo: Partial<MenuInfo>) => {
    /** 公共菜单列表，与用户拥有的菜单列表合并 */
    const finalMenuList = menus.concat(commonMenuList)
    const {key = finalMenuList[0]?.path} = menuInfo
    const menuItem = getMenuItemInMenuListByProperty(
      finalMenuList,
      'path',
      key as string,
    )

    if (menuItem) {
      dispatch(
        addTagsView({
          title: menuItem.name || menuItem.title,
          path: menuItem.path,
        }),
      )
    }
  }, [])

  return (
    <div
      className="sidebar-menu-container"
      style={{height: `calc(100% - ${variables['layout-header-top-h']})`}}
    >
      <Scrollbars autoHide>
        {menuList.map(item => {
          return (
            <Menu
              mode="inline"
              theme="dark"
              onSelect={handleMenuSelecte}
              key={item.path}
              selectedKeys={[path]}
              defaultOpenKeys={!sidebarCollapsed ? defaultOpenKeys : []}
            >
              {generatorMenuItem(item)}
            </Menu>
          )
        })}
      </Scrollbars>
    </div>
  )
}

export default memo(MenuContainer)
