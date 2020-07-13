import request from "@utils/request"

const BASE_URL = "/admin/edu/course"

// 获取数据
export function reqGetCourseList() {
  return request.get(`${BASE_URL}`)
}
