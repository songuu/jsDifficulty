import {lazy} from 'react'

const Login = lazy(() => import('./login'))
const Dashboard = lazy(() => import('./dashboard'))
const NotFound = lazy(() => import('./error/404'))
const TableCom = lazy(() => import('./component/table'))
const FormCom = lazy(() => import('./component/form'))

export {
  Login,
  Dashboard,
  NotFound,
  TableCom,
  FormCom,
}
