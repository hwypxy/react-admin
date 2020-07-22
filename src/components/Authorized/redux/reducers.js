import { GET_USER_INFO, GET_USER_MENU } from "./constants"

const initUser = {
  name: "",
  avatar: "",
  permissionValueList: [],
  permissionList: [],
}

export default function user(state = initUser, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        ...action.data,
      }
    case GET_USER_MENU:
      return {
        ...state,
        permissionList: action.data,
      }
    default:
      return state
  }
}
