import request from "@utils/request"

const BASE_URL = "/admin/edu/chapter"

// 获取数据
export function reqGetChapterList({ page, limit, courseId }) {
  return request.get(`${BASE_URL}/${page}/${limit}`, {
    params: {
      courseId,
    },
  })
}

// export function reqGetChapterList({ page, limit, courseId }) {
//   return request({
//     url: `${BASE_URL}/${page}/${limit}`,
//     method: "GET",
//     params: {
//       courseId,
//     },
//   })
// }
