import {
  Login,
  Dashboard,
  Role,
  Permission,
  User,
  Shop,
  NotFound,
  Menu,
} from '../views'
export interface routeProps {
  path: string
  name?: string
  noExtra?: boolean
  component: React.LazyExoticComponent<any>
  notAuth?: boolean
  perm?: string
}

export const globalRoutes: Array<routeProps> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const routes: Array<routeProps> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    perm: 'dashboard',
  },
  {
    path: '/error/404',
    name: '404',
    component: NotFound,
    notAuth: true,
  },
]

export default routes
