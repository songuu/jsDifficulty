import * as types from '../action-types'
import {Dispatch} from 'redux'
import {resetUser, setUserinfo, setUserToken} from './user'
import {setPerms} from './app'
import {reqLogin, reqLogout} from 'apis/login'
import {getResourse} from 'apis/app'
import {HttpStatusCode, ResponseData} from 'apis/index'
import {setToken, removeToken} from 'utils/auth'

export interface LoginAction {
  type: types.AUTH_LOGIN_TYPE
}

export interface LogoutAction {
  type: types.AUTH_LOGOUT_TYPE
}

export type AsyncLoginAction = ReturnType<typeof login>

export type AsyncLogoutAction = ReturnType<typeof logout>

export const login =
  (email: string, password: string) =>
  (dispatch: Dispatch): Promise<any> => {
    return new Promise((resolve, reject) => {
      reqLogin<any>({email, password})
        .then(response => {
          const data = response.data
          if (data.code === HttpStatusCode.OK) {
            getResourse<any>().then(res => {
              const source = res.data
              if (source.code === HttpStatusCode.OK) {
                const token = data.data
                dispatch(setUserToken(token))
                dispatch(
                  setUserinfo({
                    username: '',
                    avatar: '',
                    roleNames: null,
                  }),
                )
                dispatch(setPerms(source?.data))
                setToken(token)
                resolve(data)
              }
            })
          } else {
            reject(data.msg)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

export const logout =
  () =>
  (dispatch: Dispatch): Promise<any> => {
    return new Promise((resolve, reject) => {
      reqLogout()
        .then(response => {
          const data = response.data as ResponseData
          if (data.code === HttpStatusCode.OK) {
            dispatch(resetUser())
            removeToken()
            resolve(data)
          } else {
            reject(data.msg)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

export type AuthAction = LoginAction | LogoutAction
