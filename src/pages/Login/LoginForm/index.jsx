import React, { useState } from "react"
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from "antd"
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { login, mobileLogin } from "@redux/actions/login"
import { reqGetverifyCode } from "@api/acl/oauth"

import "./index.less"

const { TabPane } = Tabs

function LoginForm(props) {
  const [form] = Form.useForm()
  let [downCount, setDownCount] = useState(5)
  let [downCountShow, setDownCountShow] = useState(false)
  let [activeKey, setActiveKey] = useState("user")

  const onFinish = async ({ username, password }) => {
    if (activeKey === "user") {
      form.validateFields(["username", "password"]).then((res) => {
        console.log(res)
        let { username, password } = res
        props.login(username, password).then((token) => {
          // 登录成功
          // console.log("登陆成功~");
          // 持久存储token
          localStorage.setItem("user_token", token)
          props.history.replace("/")
        })
      })
    } else {
      form.validateFields(["phone", "verify"]).then((res) => {
        props.mobileLogin(res.phone, res.verify).then((token) => {
          localStorage.setItem("user_token", token)
          props.history.replace("/")
        })
      })
    }
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  }

  // 密码校验
  const validator = (rule, value) => {
    // console.log(rule, value)
    return new Promise((resolve, reject) => {
      if (!value) {
        return reject("密码不能为空！")
      }
      if (value.length < 4) {
        return reject("密码不能少于4个字符")
      }
      if (value.length > 16) {
        return reject("密码不能大于16个字符")
      }
      if (!/^[0-9a-zA-Z_]+$/.test(value)) {
        return reject("密码只能为数字、字母、下划线")
      }
      resolve()
    })
  }

  // 点击获取验证码
  const getVerifyCode = async () => {
    const res = await form.validateFields(["phone"])
    // console.log("验证码获取成功", res.phone)
    let checkNum = await reqGetverifyCode(res.phone)
    console.log(checkNum)
    setDownCountShow(true)
    let timeId = setInterval(() => {
      // downCount--
      setDownCount(--downCount)
      if (downCount <= 0) {
        clearInterval(timeId)
        setDownCount(5)
        setDownCountShow(false)
      }
    }, 1000)
  }

  const handleTabChange = (activeKey) => {
    setActiveKey(activeKey)
  }

  // git第三方授权登录
  const gitOauthLogin = () => {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=6b1e87555199ae79856e"
  }

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // 将form实例和Form组件关联起来
        form={form}
      >
        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
          onChange={handleTabChange}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "必须输入用户名" },
                { min: 4, message: "用户名至少四个字符" },
                { max: 16, message: "用户名不能超过十六个字符" },
                {
                  pattern: /^[0-9a-zA-Z_]+$/,
                  message: "用户名只能为数字、字母、下划线",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ validator }]}>
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "请输入手机号",
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: "你输入的手机号不存在",
                },
              ]}
            >
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify">
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button
                  className="verify-btn"
                  onClick={getVerifyCode}
                  disabled={downCountShow}
                >
                  {downCountShow ? `${downCount}秒后获取` : "获取验证码"}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登陆
          </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                <GithubOutlined
                  className="login-icon"
                  onClick={gitOauthLogin}
                />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  )
}

export default withRouter(connect(null, { login, mobileLogin })(LoginForm))
