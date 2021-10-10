import * as types from '../action-types'
import { getRoleSelectList } from 'apis/role'
import { Dispatch } from 'redux'
import { ResponseData } from 'apis/index'
import { roleSelectListProps } from '../reducers/role'

export interface ISetRoleSelectListAction {
  type: types.SET_ROLE_SELECT_LIST_TYPE
  payload: roleSelectListProps
}

export const setRoleSelectList = (
  roleSelectList: roleSelectListProps,
): ISetRoleSelectListAction => {
  return {
    type: types.SET_ROLE_SELECT_LIST,
    payload: roleSelectList,
  }
}

export const getSelectRoleList =
  () =>
    (dispatch: Dispatch): Promise<any> => {
      return new Promise((resolve, reject) => {
        getRoleSelectList()
          .then((response: any) => {
            const res = response.data as ResponseData
            if (res.code === 1) {
              setTimeout(() => {
                dispatch(setRoleSelectList(res.data))
                resolve(res.data)
              }, 300)
            } else {
              reject(res.msg)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }

export type RoleAction = ISetRoleSelectListAction
