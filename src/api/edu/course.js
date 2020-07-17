import request from "@utils/request"

const BASE_URL = "/admin/edu/course"

// 获取数据
export function reqGetCourseList() {
  return request.get(`${BASE_URL}`)
}

// 获取分页课程数据
export function reqGetCourseLimitList({
  page,
  limit,
  title,
  teacherId,
  subjectId,
  subjectParentId,
}) {
  return request.get(`${BASE_URL}/${page}/${limit}`, {
    params: {
      title,
      teacherId,
      subjectId,
      subjectParentId,
    },
  })
}
