import * as types from '../action-types'
import { RootActions } from '../actions'
import { RoleProps } from 'apis/models/roleModel'

export type roleSelectListProps = Pick<RoleProps<number[]>, 'id' | 'roleCode' | 'roleName'>[]

export interface RoleStateProps {
  roleSelectList: roleSelectListProps
}

const initialState: RoleStateProps = {
  roleSelectList: [],
}

export default (state = initialState, action: RootActions): RoleStateProps => {
  switch (action.type) {
    case types.SET_ROLE_SELECT_LIST:
      return {
        ...state,
        roleSelectList: action.payload,
      }
    default:
      return state
  }
}
