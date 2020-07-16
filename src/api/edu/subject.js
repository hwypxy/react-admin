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

// 更新数据
export function reqUpdateSubject(title, id) {
  return request.put(`${BASE_URL}/update`, { title, id })
}

// 删除数据
export function reqDelSubject(id) {
  return request.delete(`${BASE_URL}/remove/${id}`)
}

//获取所有一级课程分类数据
export function reqAllSubjectList() {
  return request.get(`${BASE_URL}`)
}
