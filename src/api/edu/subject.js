import request from "@utils/request"

const BASE_URL = "/admin/edu/subject"

// const MOCK_URL = `http://localhost:8000${BASE_URL}`

// 获取一级分类数据
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  })
}

// 获取二级分类数据
export function reqGetSecSubjectList(parentId) {
  return request.get(`${BASE_URL}/get/${parentId}`)
}

// 添加数据
export function reqAddSecSubjectList(title, parentId) {
  return request.post(`${BASE_URL}/save`, { title, parentId })
}
