import React, { Component } from "react"
import { Table, Button, Tooltip, Input } from "antd"
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons"

import { connect } from "react-redux"

import { getSubjectList, getSecSubjectList } from "./redux"

import "./index.less"

@connect((state) => ({ subjectList: state.subjectList }), {
  getSubjectList,
  getSecSubjectList,
})
class Subject extends Component {
  // 当前页码
  currentPage = 1

  state = {
    subjectId: "",
    subjectTitle: "",
  }

  // 加载完的生命周期
  componentDidMount() {
    this.props.getSubjectList(1, 10)
  }

  // 页码数
  handlePageChange = (page, pageSize) => {
    this.props.getSubjectList(page, pageSize)
    this.currentPage = page
  }

  // 每页条数
  handleSizeChange = (current, pageSize) => {
    this.props.getSubjectList(current, pageSize)
    this.currentPage = current
  }

  // 跳转添加课程分类页面
  handleGoAddSubject = () => {
    this.props.history.push("/edu/subject/add")
  }

  // 点击+展示二级菜单
  handleClickExpand = (expanded, record) => {
    if (expanded) {
      this.props.getSecSubjectList(record._id)
    }
  }

  // 分类名称改变时
  handleTitleChange = (e) => {
    this.setState({
      subjectTitle: e.target.value,
    })
  }

  // 点击编辑按钮进行数据更新
  handleUpdateClick = (value) => {
    return () => {
      this.setState({
        subjectId: value._id,
        subjectTitle: value.title,
      })
    }
  }

  // 取消编辑操作
  handleCancel = () => {
    this.setState({
      subjectId: "",
    })
  }

  // 确定提交更新后的数据
  handleCommit = () => {}

  render() {
    // 表格参数
    const columns = [
      {
        title: "课程分类",
        // dataIndex: "title",
        key: "title",
        render: (value) => {
          if (this.state.subjectId === value._id) {
            return (
              <Input
                style={{ width: 500 }}
                value={this.state.subjectTitle}
                onChange={this.handleTitleChange}
              />
            )
          }
          return <span>{value.title}</span>
        },
      },
      {
        title: "操作",
        // dataIndex: "",
        key: "x",
        render: (value) => {
          if (this.state.subjectId === value._id) {
            return (
              <>
                <Button
                  type="primary"
                  style={{ marginRight: 20 }}
                  onClick={this.handleCommit}
                >
                  确认
                </Button>
                <Button type="danger" onClick={this.handleCancel}>
                  取消
                </Button>
              </>
            )
          }
          return (
            <>
              <Tooltip title={"修改课程"}>
                {/* 表格修改按钮 */}
                <Button
                  type="primary"
                  style={{ marginRight: 20 }}
                  onClick={this.handleUpdateClick(value)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title={"删除课程"}>
                {/* 表格删除按钮 */}
                <Button type="danger">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          )
        },
        width: 400,
        align: "center",
      },
    ]

    return (
      <>
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          style={{ marginBottom: 20 }}
          onClick={this.handleGoAddSubject}
        >
          {/* 新建 */}
        </Button>
        <Table
          className={"table"}
          columns={columns}
          expandable={{
            onExpand: this.handleClickExpand,
          }}
          dataSource={this.props.subjectList.items}
          rowKey="_id"
          pagination={{
            total: this.props.subjectList.total,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            // defaultPageSize: 5,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handleSizeChange,
            current: this.currentPage,
          }}
        />
      </>
    )
  }
}
export default Subject
