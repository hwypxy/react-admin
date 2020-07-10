import React, { Component } from "react"
import { Table, Button } from "antd"
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons"

import { connect } from "react-redux"

// import { reqGetSubjectList } from "@api/edu/subject"

import { getSubjectList } from "./redux"

import "./index.less"

const columns = [
  { title: "课程分类", dataIndex: "title", key: "name" },
  {
    title: "操作",
    dataIndex: "",
    key: "x",
    render: () => (
      <>
        <Button type="primary" style={{ marginRight: 20 }}>
          <FormOutlined />
        </Button>
        <Button type="danger">
          <DeleteOutlined />
        </Button>
      </>
    ),
    width: 400,
    align: "center",
  },
]

const data = [
  {
    key: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    name: "Not Expandable",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    description:
      "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
  },
]

@connect((state) => ({ subjectList: state.subjectList }), { getSubjectList })
class Subject extends Component {
  // state = {
  //   size: "large",
  // }

  currentPage = 1

  // 加载完的生命周期
  componentDidMount() {
    this.props.getSubjectList(1, 10)
  }

  //获取subject数据
  // getSubjectList = async (page, limit) => {
  //   const res = await getSubjectList(page, limit)
  //   this.setState({
  //     subject: res,
  //   })
  // }

  //页码数
  handlePageChange = (page, pageSize) => {
    this.props.getSubjectList(page, pageSize)
    this.currentPage = page
  }

  // 每页条数
  handleSizeChange = (current, pageSize) => {
    this.props.getSubjectList(current, pageSize)
    this.currentPage = current
  }

  // //按钮大小
  // handleSizeChange = (e) => {
  //   this.setState({ size: e.target.value })
  // }
  render() {
    // const { size } = this.state
    return (
      <>
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          // size={size}
          style={{ marginBottom: 20 }}
        >
          新建
        </Button>
        <Table
          className={"table"}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={this.props.subjectList.items}
          rowKey="_id"
          pagination={{
            total: this.props.subjectList.total,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            // defaultPageSize: 5, //每页默认显示数据条数
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
