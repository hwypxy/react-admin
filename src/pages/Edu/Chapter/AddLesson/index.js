import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Card, Button, Form, Input, Select, message } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"

const { Option } = Select
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 8,
  },
}

export default class AddLesson extends Component {
  formRef = React.createRef()

  state = {
    subjectList: {
      total: 0,
      // items: [],
    },
  }

  onGenderChange = (value) => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`,
    })
  }

  onFinish = (values) => {
    console.log(values)
  }
  render() {
    return (
      <div>
        <Card
          title={
            <>
              <Link to="/edu/chapter/list">
                <ArrowLeftOutlined />
              </Link>
              <span className="title" style={{ marginLeft: 15 }}>
                新增章节
              </span>
            </>
          }
        >
          <Form
            {...layout}
            ref={this.formRef}
            name="control-ref"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="chapter1"
              label="课程"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="请选择课程"
                onChange={this.onGenderChange}
                allowClear
              >
                <Option value="male">课程</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="chapter2"
              label="章节"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="请选择章节"
                onChange={this.onGenderChange}
                allowClear
              >
                <Option value="male">章节</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="chapterName"
              label="章节"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="请输入要添加的名称" />
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.gender !== currentValues.gender
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("gender") === "other" ? (
                  <Form.Item
                    name="customizeGender"
                    label="Customize Gender"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
