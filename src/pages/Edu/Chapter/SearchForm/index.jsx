import React, { useEffect, useState } from "react"
import { Form, Select, Button, message } from "antd"
import { connect } from "react-redux"

import { reqGetCourseList } from "@api/edu/course"
import { getChapterList } from "../redux"

import "./index.less"

const { Option } = Select

// SearchForm
function SearchForm(props) {
  //useState全局数据
  const [courseList, setCourseList] = useState([])

  const [form] = Form.useForm()

  // 重置按钮
  const resetForm = async () => {
    // 重置课程选项
    form.resetFields()
    // 重置表格数据
    await props.getChapterList({})
  }

  // Hook生命周期
  useEffect(() => {
    async function fetchData() {
      // 获取课程选项数据
      const res = await reqGetCourseList()
      setCourseList(res)
    }
    fetchData()
  }, [])

  // 查询课程章节
  const handleGetChapterList = async (value) => {
    if (value.courseId) {
      const data = {
        page: 1,
        limit: 10,
        courseId: value.courseId, //课程选项Id
      }
      // 获取一级章节数据
      await props.getChapterList(data)
      message.success("课程章节列表数据获取成功！")
    } else {
      message.error("获取课程失败...")
    }
  }

  return (
    <Form layout="inline" form={form} onFinish={handleGetChapterList}>
      <Form.Item name="courseId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {courseList.map((item) => {
            return (
              <Option value={item._id} key={item._id}>
                {item.title}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default connect(null, { getChapterList })(SearchForm)
