import React, { Component } from "react"
import { Button, message, Tooltip, Modal, Alert, Table, Carousel } from "antd"
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import dayjs from "dayjs"

import relativeTime from "dayjs/plugin/relativeTime"

import { connect } from "react-redux"
import SearchForm from "./SearchForm"
import { getLessonList, batchDelChapter, batchDelLesson } from "./redux"

// 播放器
import Player from "griffith"

// 导入全屏的包
import screenfull from "screenfull"

import "./index.less"

dayjs.extend(relativeTime)

@connect(
  (state) => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
    chapterList: state.chapterList,
  }),
  { getLessonList, batchDelChapter, batchDelLesson }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [],
    visible: false,
    video: "",
  }

  showImgModal = (img) => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img,
      })
    }
  }

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    })
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    })

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      })
    })
  }

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据")
          return
        }
        message.success("获取用户列表数据成功")
      })
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    })
  }

  // handleSelect = (record, selected, selectedRows, nativeEvent) => {
  //   console.log(111)
  //   console.log(record, selected, selectedRows, nativeEvent)
  // }

  // 点击+ 展示子列表
  handleClickExpand = (expanded, record) => {
    // console.log("图标", record._id)
    if (expanded) {
      this.props.getLessonList(record._id)
    }
  }

  //跳转新增课程页面
  goToAddLess = (data) => () => {
    this.props.history.push("/edu/chapter/addlesson", data)
  }

  // 显示视频预览模态框
  showModal = (video) => () => {
    // console.log("Modal0:", video)
    const videoString = video.split(",")
    console.log("Modal1:", videoString)
    this.setState(
      {
        visible: true,
        video: videoString,
      },
      () => {
        console.log("Modal2:", this.state.video)
      }
    )
  }

  // 关闭视频模态框
  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }
  handleClick = (e) => {
    console.log("click ", e)
    this.setState({ current: e.key })
  }

  // 批量删除
  handleBatchDel = () => {
    Modal.confirm({
      title: "确定删除吗？",
      onOk: async () => {
        // 储存选中章节Id
        let chapterIds = []
        // 储存选中课时Id
        let lessonIds = []

        // 拿到选中id
        let selectedRowKeys = this.state.selectedRowKeys
        // 拿到章节数据
        let chapterList = this.props.chapterList.items
        // console.log(chapterList)
        chapterList.forEach((chapter) => {
          // 章节Id
          let chapterId = chapter._id

          let index = selectedRowKeys.indexOf(chapterId)
          console.log("index", index)
          if (index > -1) {
            let newArry = selectedRowKeys.splice(index, 1)
            chapterIds.push(newArry[0])
          }
        })
        lessonIds = [...selectedRowKeys]

        // console.log("chapterIds:", chapterIds)
        // console.log("lessonIds:", lessonIds)

        //调用接口 删除章节
        if (chapterIds) await this.props.batchDelChapter(chapterIds)
        if (lessonIds) await this.props.batchDelLesson(lessonIds)
      },
    })
  }

  // 全屏
  handlescreenFull = () => {
    screenfull.toggle()
  }

  render() {
    const { previewVisible, previewImage, selectedRowKeys } = this.state

    // 视频格式参数
    let sources =
      this.state.video &&
      this.state.video.map((item, index) => ({
        hd: {
          play_url: item,
          bitrate: 1,
          duration: 1000,
          format: "",
          height: 500,
          width: 500,
          size: 160000,
        },
      }))

    // console.log("videoUrlArr", sources)

    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        render: (isFree) => {
          return isFree === true ? "是" : isFree === false ? "否" : ""
        },
      },
      {
        title: "视频",
        // dataIndex: "free",
        render: ({ free, video }) => {
          //章节不展示
          if (!free) return

          // console.log(video)
          // 课时才展示
          return free === true && video ? (
            <>
              <Button onClick={this.showModal(video)}>预览</Button>
              <Modal
                title="视频"
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={null}
                width={500}
                destroyOnClose={true}
                centered
              >
                {this.state.video && (
                  <Carousel dotPosition="top">
                    {this.state.video.map((item, index) => (
                      <div key={index}>
                        <Player
                          sources={sources[index]}
                          // play_ur={item}
                          id={item}
                          cover={"http://localhost:3000/logo512.png"}
                          duration={1000}
                        ></Player>
                      </div>
                    ))}
                  </Carousel>
                )}
              </Modal>
            </>
          ) : (
            ""
          )
        },
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        align: "right",
        render: (data) => {
          // if ("free" in data) return
          return (
            <div>
              {data.free === undefined && (
                <Tooltip title="新增课时">
                  <Button type="primary" onClick={this.goToAddLess(data)}>
                    <PlusOutlined />
                  </Button>
                </Tooltip>
              )}
              <Tooltip title="更新章节">
                <Button type="primary" style={{ margin: "0 10px" }}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="删除章节">
                <Button type="danger" style={{ marginRight: "20%" }}>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          )
          // }
        },
      },
    ]

    const data = [
      {
        id: "111",
        title: "第一章节",
        children: [
          {
            id: "1",
            title: "第一课时",
            free: false,
            videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
          },
          {
            id: "2",
            title: "第二课时",
            free: true,
            videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
          },
          {
            id: "3",
            title: "第三课时",
            free: true,
            videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
          },
        ],
      },
    ]

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      // onSelect: this.handleSelect,
      // type: "checkbox ",
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
    }

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button
                type="danger"
                style={{ marginRight: 10 }}
                onClick={this.handleBatchDel}
              >
                <span>批量删除</span>
              </Button>
              <Tooltip
                title="全屏"
                className="course-table-btn"
                onClick={this.handlescreenFull}
              >
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            className="table"
            rowSelection={rowSelection}
            // onChange={this.handleOnChange}
            columns={columns}
            dataSource={this.props.chapterList.items}
            rowKey="_id"
            expandable={{ onExpand: this.handleClickExpand }}
          />
        </div>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default Chapter
