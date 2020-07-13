import request from "@utils/request"

const BASE_URL = "/admin/edu/lesson"

export const reqGetLessonList = (chapterId) => {
  return request.get(`${BASE_URL}/get/${chapterId}`)
}
