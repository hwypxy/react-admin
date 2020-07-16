import {
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  BATCH_DEL_CHAPTER,
  BATCH_DEL_LESSON,
} from "./constant"

const initChapterList = {
  total: 0, // 总数
  items: [], // 详细数据
}

export default function chapterList(state = initChapterList, action) {
  switch (action.type) {
    case GET_CHAPTER_LIST:
      action.data.items.forEach((item) => {
        item.children = []
      })
      // console.log(action.data)
      return action.data
    case GET_LESSON_LIST:
      if (action.data.length) {
        state.items.forEach((item) => {
          if (item._id === action.data[0].chapterId) {
            item.children = action.data
          }
        })
        // console.log(action.data)
      }
      return { ...state }
    case BATCH_DEL_CHAPTER:
      const newItem = state.items.filter((item) => {
        return action.data.indexOf(item._id) > -1 ? false : true
      })
      return { ...state, items: newItem }

    case BATCH_DEL_LESSON:
      state.items.forEach((chapter) => {
        const newChild = chapter.children.filter((item) => {
          return action.data.indexOf(item._id) > -1 ? false : true
        })
        if (newChild === chapter.children) return
        chapter.children = newChild
      })
      return { ...state }
    default:
      return state
  }
}
