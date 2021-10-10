import React from 'react'
import {
  DashboardOutlined,
  FileOutlined,
  SearchOutlined,
  LockOutlined,
  ClusterOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons'

export interface IconEnmu {
  dashboard: React.ReactNode
  [propName: string]: React.ReactNode
}

export interface MenuListProps {
  path: string
  title: string
  icon?: string
  children?: Array<MenuListProps>
  // eslint-disable-next-line
  [propName: string]: any
}

export const iconEnmu: IconEnmu = {
  home: <HomeOutlined />,
  dashboard: <DashboardOutlined />,
  file: <FileOutlined />,
  search: <SearchOutlined />,
  lock: <LockOutlined />,
  cluster: <ClusterOutlined />,
  user: <UserOutlined />,
  setting: <SettingOutlined />,
}

const MenuList: MenuListProps[] = [
  {
    path: '/dashboard',
    title: '首页',
    icon: 'home',
  }
]

export const commonMenuList: MenuListProps[] = []

// export const commonMenuList: MenuListProps[] = MenuList

export default MenuList
