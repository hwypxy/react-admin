import { GET_CHAPTER_LIST, GET_LESSON_LIST } from "./constant"

import { reqGetChapterList } from "@api/edu/chapter"
import { reqGetLessonList } from "@api/edu/lesson"

// 获取章节列表同步action
const getChapterListSync = (data) => ({
  type: GET_CHAPTER_LIST,
  data,
})
// function getChapterListSync(data) {
//   return { type: GET_CHAPTER_LIST, data }
// }

// 获取章节列表异步action
export function getChapterList({ page, limit, courseId }) {
  return (dispatch) => {
    return reqGetChapterList({ page, limit, courseId }).then((response) => {
      dispatch(getChapterListSync(response))
      return response
    })
  }
}

const getLessonListSync = (data) => ({
  type: GET_LESSON_LIST,
  data,
})
export function getLessonList(chapterId) {
  return (dispatch) => {
    return reqGetLessonList(chapterId).then((res) => {
      dispatch(getLessonListSync(res))
      return res
    })
  }
}
