import React, { Component } from "react"
import { Table, Button, Tooltip, Input, message, Modal } from "antd"
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"

import { connect } from "react-redux"

import { getSubjectList, getSecSubjectList, updateSubject } from "./redux"

import { reqDelSubject } from "@api/edu/subject"

import "./index.less"

const { confirm } = Modal

@connect((state) => ({ subjectList: state.subjectList }), {
  getSubjectList,
  getSecSubjectList,
  updateSubject,
})
class Subject extends Component {
  // 当前页码
  currentPage = 1
  pageSize = 10

  state = {
    subjectId: "",
    subjectTitle: "",
  }

  // 加载完的生命周期
  componentDidMount() {
    this.props.getSubjectList(1, this.pageSize)
  }

  // 页码数
  handlePageChange = (page, pageSize) => {
    this.props.getSubjectList(page, pageSize)
    this.currentPage = page
  }

  // 每页条数
  handleSizeChange = (current, size) => {
    this.props.getSubjectList(current, size)
    this.currentPage = current
    this.pageSize = size
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
      this.oldSubjectTitle = value.title
    }
  }

  // 取消编辑操作
  handleCancel = (e) => {
    this.setState({
      subjectId: "",
      subjectTitle: "",
    })
  }

  // 确定提交更新后的数据
  handleUpdate = async () => {
    let { subjectTitle, subjectId } = this.state
    if (subjectTitle.length) {
      if (this.oldSubjectTitle !== subjectTitle) {
        await this.props.updateSubject(subjectTitle, subjectId)
        message.success("更新成功")
        this.handleCancel()
      } else {
        message.error("内容没有修改哦！")
        this.handleCancel()
      }
    } else {
      message.error("课程名称不能为空")
    }
  }

  // 删除数据
  handleDeleteSubject = (value) => {
    return () => {
      confirm({
        title: (
          <>
            <div>
              确定删除
              <span style={{ color: "red", fontSize: 30 }}>{value.title}</span>
              吗？
            </div>
          </>
        ),
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          await reqDelSubject(value._id)
          message.success("删除成功")
          const totalPage = Math.ceil(
            this.props.subjectList.total / this.pageSize
          )
          const lastPageSize = this.props.subjectList.total % this.pageSize
          // console.log("currentPage", this.currentPage)
          // console.log("当前数据长度", this.props.subjectList.items.length)
          // console.log("totalpage", totalPage)
          console.log(this.props.subjectList.items.length)
          if (
            this.currentPage !== 1 &&
            lastPageSize === 1 &&
            totalPage === this.currentPage
          ) {
            console.log(111)
            this.props.getSubjectList(--this.currentPage, this.pageSize)
            return
          }
          this.props.getSubjectList(this.currentPage, this.pageSize)
        },
      })
    }
  }

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
                  onClick={this.handleUpdate}
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
                <Button type="danger" onClick={this.handleDeleteSubject(value)}>
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
            current: this.currentPage, //当前页码数
          }}
        />
      </>
    )
  }
}
export default Subject
