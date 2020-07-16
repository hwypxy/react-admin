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

//批量删除章节
// export function reqBatchDelChapter(chapterIds) {
//   return request.delete(`${BASE_URL}/batchRemove`, {
//     data: { idList: chapterIds },
//   })
// }

export function reqBatchDelChapter(chapterIds) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: {
      idList: chapterIds,
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
