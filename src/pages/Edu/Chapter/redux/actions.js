import {
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  BATCH_DEL_CHAPTER,
  BATCH_DEL_LESSON,
} from "./constant"

import { reqGetChapterList, reqBatchDelChapter } from "@api/edu/chapter"
import { reqGetLessonList, reqBatchDelLesson } from "@api/edu/lesson"

// 获取章节列表同步action
const getChapterListSync = (data) => ({
  type: GET_CHAPTER_LIST,
  data,
})

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
// 获取课时
export function getLessonList(chapterId) {
  return (dispatch) => {
    return reqGetLessonList(chapterId).then((res) => {
      dispatch(getLessonListSync(res))
      return res
    })
  }
}

const batchDelChapterSync = (data) => ({
  type: BATCH_DEL_CHAPTER,
  data,
})
//批量删除章节
export function batchDelChapter(chapterIds) {
  console.log(chapterIds)
  return (dispatch) => {
    return reqBatchDelChapter(chapterIds).then((res) => {
      dispatch(batchDelChapterSync(chapterIds))
      return res
    })
  }
}

const batchDelLessonSync = (data) => ({
  type: BATCH_DEL_LESSON,
  data,
})
//批量删除课时
export function batchDelLesson(lessonIds) {
  return (dispatch) => {
    return reqBatchDelLesson(lessonIds).then((res) => {
      dispatch(batchDelLessonSync(lessonIds))
      return res
    })
  }
}
