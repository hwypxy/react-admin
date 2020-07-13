import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST } from "./constants"

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细user数据
}

export default function subjectList(state = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach((item) => {
        item.children = []
      })
      return action.data
    case GET_SECSUBJECT_LIST:
      if (action.data.items.length) {
        const parentId = action.data.items[0].parentId
        state.items.forEach((item) => {
          if (item._id === parentId) {
            item.children = action.data.items
          }
        })
      }
      return {
        ...state,
      }
    default:
      return state
  }
}
