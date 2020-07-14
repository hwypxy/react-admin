import React, { Component } from "react"
import { Upload, Button, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { reqGetQiNiuToken } from "@api/edu/lesson"

import * as qiniu from "qiniu-js"
import { nanoid } from "nanoid"

const MAX_VIDEO_SIZE = 20 * 1024 * 1024
export default class MyUpload extends Component {
  constructor() {
    super()

    // 获取本地uploadToken的数据
    const str = localStorage.getItem("uploadToken")
    // 判断数据是否已存在
    if (str) {
      // 字符串转换成对象
      const res = JSON.parse(str)

      this.state = {
        expires: res.expires,
        uploadToken: res.uploadToken,
      }
    } else {
      // 不存在则初始化数据
      this.state = {
        expires: 0,
        uploadToken: "",
      }
    }
  }

  // 储存uploadToken和过期时间的方法
  saveUploadToken = (uploadToken, expires) => {
    // 获取token的生命周期
    const targetTime = Date.now() + expires * 1000
    expires = targetTime
    const upload_token = JSON.stringify({ uploadToken, expires })
    // 储存数据到本地localStorage
    localStorage.setItem("uploadToken", upload_token)

    // 存储到state
    this.setState({
      uploadToken,
      expires,
    })
  }

  // 上传视频之前用
  handleBeforeUpload = (file, fileList) => {
    return new Promise(async (resolve, reject) => {
      // 判断文件大小是否超过限制，如果为真直接取消上传
      if (file.size > MAX_VIDEO_SIZE) {
        message.error("视频不能超过20M")
        reject("视频不能超过20M")
        return
      }
      // 判断时间是否过期,如果为真则为过期,需要重新请求token
      if (Date.now() > this.state.expires) {
        const { uploadToken, expires } = await reqGetQiNiuToken()
        this.saveUploadToken(uploadToken, expires)
      }
      // 返回删除的文件
      resolve(file)
    })
  }

  // 上传视频时调用
  handleCustomRequest = (value) => {
    // console.log(value)
    // console.log("file", file)
    // console.log(value)
    // console.log(value)
    const file = value.file
    const key = nanoid(10)
    const token = this.state.uploadToken
    const putExtra = {
      fname: "hwy", //文件原名称
      //   params: {}, // 用来放置自定义变量
      mimeType: ["video/*"], //用来限定上传文件类名
    }
    const config = {
      region: qiniu.region.z2,
    }
    const observable = qiniu.upload(file, key, token, putExtra, config)

    // 创建上传过程触发回调函数的对象
    const observer = {
      //上传中
      next(res) {
        value.onProgress(res.total)
      },
      //上传失败
      error(err) {
        value.onError(err)
      },
      // 上传成功
      complete: (res) => {
        value.onSuccess(res)
        let data = data.push("http://qdcdb1qpp.bkt.clouddn.com/" + res.key)
        console.log(data)
        // console.log(this.props.onChange)
        this.props.onChange("http://qdcdb1qpp.bkt.clouddn.com/" + res.key)
      },
    }
    // 上传开始
    this.subscription = observable.subscribe(observer)
  }

  //   componentDidMount() {
  //     console.log(this.props.num)
  //     console.log(this.props.onChange)
  //   }

  componentWillUnmount() {
    // 上传取消
    this.subscription && this.subscription.unsubscribe()
  }

  //发送请求获取token指令 -> 测试
  getToken = () => {
    reqGetQiNiuToken().then((res) => {
      // 返回{UploadToken,expires}对象
      return res
    })
  }

  render() {
    return (
      <div>
        <Upload
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.handleCustomRequest}
          accept="video/*"
          multiple={true}
        >
          <Button style={{ marginLeft: 20 }}>
            <UploadOutlined /> 上传视频
          </Button>
        </Upload>
      </div>
    )
  }
}
