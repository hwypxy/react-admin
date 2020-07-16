import request from "@utils/request"

const BASE_URL = "/admin/edu/lesson"

// 获取章节所有课时列表
export const reqGetLessonList = (chapterId) => {
  return request.get(`${BASE_URL}/get/${chapterId}`)
}

// 获取七牛云上传凭据
export const reqGetQiNiuToken = () => {
  return request.get(`/uploadtoken`)
}

// 新增课时
export const reqAddLesson = ({ chapterId, title, free, video }) => {
  return request.post(`${BASE_URL}/save`, {
    chapterId,
    title,
    free,
    video,
  })
}

//批量删除课时
// export function reqBatchDelChapter(chapterIds) {
//   return request.delete(`${BASE_URL}/batchRemove`, {
//     data: { idList: chapterIds },
//   })
// }
export function reqBatchDelLesson(chapterIds) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: {
      idList: chapterIds,
    },
  })
}

// 删除课时
// export const reqRemoveLesson = (lessonId) => {
//   return request.delete(`${BASE_URL}/remove/${lessonId}`)
// }

// export const reqRemoveLesson = (lessonId) => {
//   return request({
//     url: `${BASE_URL}/remove/${lessonId}`,
//     method: "DELETE",
//     // data: {
//     //   lessonId,
//     // },
//   })
// }
