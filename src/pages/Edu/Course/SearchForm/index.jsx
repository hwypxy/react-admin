import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Form, Input, Select, Cascader, Button } from "antd"

import { reqGetAllTeacherList } from "@api/edu/teacher"
import { reqAllSubjectList, reqGetSecSubjectList } from "@api/edu/subject"
import { getCourseList } from "../redux"

// 国际化包
import { FormattedMessage, useIntl } from "react-intl"

import "./index.less"

const { Option } = Select

function SearchForm(props) {
  const intl = useIntl() // 国际化对象
  const [form] = Form.useForm()
  const [teacherList, setTeacherList] = useState([])
  const [subjectList, setSubjectList] = useState([])

  //#region
  // state
  // const [options, setOptions] = useState([
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     isLeaf: false,
  //   },
  //   {
  //     value: "jiangsu",
  //     label: "Jiangsu",
  //     isLeaf: false,
  //   },
  // ])
  //#endregion

  // useEffect
  useEffect(() => {
    async function fetchData() {
      const [teachers, subjectList] = await Promise.all([
        reqGetAllTeacherList(),
        reqAllSubjectList(),
      ])
      const options = subjectList.map((subject) => {
        return {
          value: subject._id,
          label: subject.title,
          isLeaf: false,
        }
      })

      setTeacherList(teachers)
      setSubjectList(options)
    }
    fetchData()
  }, [])

  // 课程分类子元素被点击时
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }

  // 课程分类子元素加载数据
  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    // 展示加载图标
    targetOption.loading = true
    // 获取二级课程分类
    let secSubject = await reqGetSecSubjectList(targetOption.value)
    secSubject = secSubject.items.map((item) => ({
      value: item._id,
      label: item.title,
    }))
    // 隐藏加载图标
    targetOption.loading = false
    if (secSubject.length > 0) {
      targetOption.children = secSubject
    } else {
      targetOption.isLeaf = true
    }
    // 更新subject
    setSubjectList([...subjectList])

    //#region
    // #setTimeout(() => {
    //   targetOption.loading = false
    //   targetOption.children = [
    //     {
    //       label: `${targetOption.label} Dynamic 1`,
    //       value: "dynamic1",
    //     },
    //     {
    //       label: `${targetOption.label} Dynamic 2`,
    //       value: "dynamic2",
    //     },
    //   ]
    //   setSubjectList([...subjectList])
    // }, 1000)
    //#endregion
  }

  const resetForm = () => {
    form.resetFields()
  }

  // 提交数据 / 点击查询
  const onFinish = async (value) => {
    let subjectId
    let subjectParentId
    if (value.subject && value.subject.length > 1) {
      subjectId = value.subject[1]
      subjectParentId = value.subject[0]
    }
    if (value.subject && value.subject.length === 1) {
      subjectId = value.subject[0]
      subjectParentId = 0
    }
    const data = {
      page: 1,
      limit: 5,
      title: value.title,
      teacherId: value.teacherId,
      subjectId,
      subjectParentId,
    }
    await props.getCourseList(data)
  }

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="title" label={<FormattedMessage id="title" />}>
        <Input
          placeholder={intl.formatMessage({
            id: "title",
          })}
          style={{ width: 250, marginRight: 20 }}
        />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id="teacher" />}>
        <Select
          allowClear
          placeholder={intl.formatMessage({
            id: "teacher",
          })}
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map((item) => (
            <Option value={item._id} key={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id="subject" />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList}
          loadData={loadData}
          onChange={onChange}
          // changeOnSelect
          placeholder={intl.formatMessage({
            id: "subject",
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          {<FormattedMessage id="searchBtn" />}
        </Button>
        <Button onClick={resetForm}>
          {" "}
          {<FormattedMessage id="resetBtn" />}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(null, { getCourseList })(SearchForm)
