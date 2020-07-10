import request from "@utils/request"

const BASE_URL = "/admin/edu/subject"

// const MOCK_URL = `http://localhost:8000${BASE_URL}`

export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  })
}
