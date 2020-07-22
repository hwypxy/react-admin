import { getInfo, getMenu } from "@api/acl/login"

import { GET_USER_INFO, GET_USER_MENU } from "./constants"

function GetUserInfoSync(data) {
  return { type: GET_USER_INFO, data }
}

export function getUserInfo() {
  return (dispatch) => {
    return getInfo().then((res) => {
      dispatch(GetUserInfoSync(res))
      return res
    })
  }
}

function GetUserMenuSync(data) {
  return { type: GET_USER_MENU, data }
}

export function getUserMenu() {
  return (dispatch) => {
    return getMenu().then((res) => {
      dispatch(GetUserMenuSync(res.permissionList))
      console.log("res", res)
      return res.permissionList
    })
  }
}
