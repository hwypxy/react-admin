import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Card, Button, Form, Input, Switch, message } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"

import MyUpload from "../MyUpload"
import { reqAddLesson } from "@api/edu/lesson"

const layout = {
  labelCol: {
    span: 1,
  },
  wrapperCol: {
    span: 4,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 1,
    span: 4,
  },
}

export default class AddLesson extends Component {
  // formRef = React.createRef()

  state = {
    subjectList: {
      total: 0,
      items: [],
    },
  }

  // onGenderChange = (value) => {
  //   this.formRef.current.setFieldsValue({
  //     note: `Hi, ${value === "male" ? "man" : "lady"}!`,
  //   })
  // }

  // 表单提交时
  onFinish = (value) => {
    // console.log(values)
    // console.log(this.props.location.state._id)

    // chapterId, value.title, values.free, value.video
    const chapterId = this.props.location.state._id

    const { title, free, video } = value
    reqAddLesson({ chapterId, title, free, video })
    this.props.history.push("/edu/chapter/list")
  }

  // // switch按钮改变时
  // onChange = () => {
  //   console.log(true)
  // }
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
                新增课时
              </span>
            </>
          }
        >
          <Form
            {...layout}
            // ref={this.formRef}
            name="control-ref"
            onFinish={this.onFinish}
            initialValues={{
              free: true,
            }}
          >
            <Form.Item
              name="title"
              label="课时名称"
              rules={[
                {
                  required: true,
                  message: "请输入课时名称",
                },
              ]}
            >
              <Input
                placeholder="请输入要课时名称"
                style={{ marginLeft: 20 }}
              />
            </Form.Item>
            <Form.Item
              name="free"
              label="是否免费"
              rules={[
                {
                  required: true,
                  message: "请选择是否免费",
                },
              ]}
              valuePropName="checked"
            >
              <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                defaultChecked
                // onChange={this.onChange}
                style={{ marginLeft: 20 }}
              />
            </Form.Item>
            <Form.Item
              name="video"
              label="上传视频"
              rules={[
                {
                  required: true,
                  message: "请上传视频",
                },
              ]}
            >
              <MyUpload num="1" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                添加
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
