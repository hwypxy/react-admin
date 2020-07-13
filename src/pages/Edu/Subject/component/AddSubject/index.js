import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Card, Button, Form, Input, Select, message } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"

// import { connect } from "react-redux"
import { reqGetSubjectList, reqAddSecSubjectList } from "@api/edu/subject"

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

// @connect((state) => ({ subjectList: state.subjectList }), {
//   getSubjectList,
//   getSecSubjectList,
// })
class AddSubject extends Component {
  formRef = React.createRef()

  state = {
    subjectList: {
      total: 0,
      items: [],
    },
  }

  page = 1
  limit = 5

  // 页面加载后获取一级分类id数据
  async componentDidMount() {
    const res = await reqGetSubjectList(this.page++, this.limit)
    this.setState({
      subjectList: res,
    })
  }

  //提交按钮
  onFinish = async (values) => {
    console.log(values.parentId)
    console.log(values.subjectName)
    try {
      await reqAddSecSubjectList(values.subjectName, values.parentId)
      message.success("课程分类添加成功！")
      this.props.history.push("/edu/subject/list")
    } catch {
      message.error("课程分类添加失败")
    }
  }

  // 获取更多数据
  handleloadMore = async () => {
    const res = await reqGetSubjectList(this.page++, this.limit)
    const newItems = [...this.state.subjectList.items, ...res.items]
    this.setState({
      subjectList: {
        total: res.total,
        items: newItems,
      },
    })
  }
  render() {
    return (
      <div>
        <Card
          title={
            <>
              <Link to="/edu/subject/list">
                <ArrowLeftOutlined />
              </Link>
              <span className="title" style={{ marginLeft: 15 }}>
                新增课程
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
              name="subjectName"
              label="课程分类名称"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="请输入课程分类!" />
            </Form.Item>
            <Form.Item
              name="parentId"
              label="父级分类id"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="请选择分类id"
                // allowClear
                dropdownRender={(menu) => {
                  return (
                    <>
                      {menu}
                      {this.state.subjectList.total >
                        this.state.subjectList.items.length && (
                        <Button type="link" onClick={this.handleloadMore}>
                          加载更多数据
                        </Button>
                      )}
                    </>
                  )
                }}
              >
                <Option value={0} key={0}>
                  {"一级课程分类"}
                </Option>
                {this.state.subjectList.items.map((subject) => {
                  return (
                    <Option value={subject._id} key={subject._id}>
                      {subject.title}
                    </Option>
                  )
                })}
              </Select>
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
export default AddSubject
