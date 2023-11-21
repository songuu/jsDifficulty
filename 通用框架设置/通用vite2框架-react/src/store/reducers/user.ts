import * as types from '../action-types'
import {getToken} from 'utils/auth'
import {RootActions} from '../actions'

export interface UserStateProps {
  username: string
  email?: string
  mobile?: string
  nickname?: string
  avatar: string
  sex?: number
  token?: string
  roleNames: string[] | null
  permissions?: string[]
  remark?: string
  status?: number
}

const initialState: UserStateProps = {
  username: 'admin',
  avatar: 'https://s1.ax1x.com/2020/04/28/J5hUaT.jpg',
  token: getToken(),
  roleNames: null,
  permissions: [],
}

export default (state = initialState, action: RootActions): UserStateProps => {
  switch (action.type) {
    case types.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case types.RESET_USER:
      return {
        ...state,
        username: '',
        token: '',
        avatar: '',
        roleNames: [],
      }
    case types.SET_USERINFO:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
