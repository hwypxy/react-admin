import React, { Component } from "react"
import { Layout, Menu, Breadcrumb } from "antd"
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons"

import { connect } from "react-redux"

import { withRouter } from "react-router-dom"

import SiderMenu from "../SiderMenu"

import "./index.less"

import logo from "@assets/images/logo.png"

const { Header, Content, Footer, Sider } = Layout
// const { SubMenu } = Menu
@withRouter
@connect((state) => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }
  render() {
    let { name, avatar, permissionList } = this.props.user
    // 获取浏览器路径
    const path = this.props.location.pathname
    const reg = /[/][a-z]*/g
    const matchArr = path.match(reg)
    const firstPath = matchArr[0]
    const secPath = matchArr[1]
    const thirdPath = matchArr[2] || ""

    let firstName
    let secName
    permissionList.forEach((item) => {
      if (item.path === firstPath) {
        firstName = item.name
        item.children.forEach((secItem) => {
          if (secItem.path === secPath + thirdPath) {
            secName = secItem.name
          }
        })
      }
    })

    return (
      <Layout className="layout">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <img src={logo} alt="" />
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SiderMenu></SiderMenu>
          {/* <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />} />
          </Menu> */}
        </Sider>
        <Layout>
          <Header className="layout-header">
            <img src={logo} alt="" />
            <span>用户名</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className="layout-nav">
              {firstName === undefined ? (
                "首页"
              ) : (
                <>
                  {""}
                  <Breadcrumb>
                    <Breadcrumb.Item>{firstName}</Breadcrumb.Item>
                    <Breadcrumb.Item>{secName}</Breadcrumb.Item>
                  </Breadcrumb>
                  <h3>{secName}</h3>
                </>
              )}
            </div>
            <div className="layout-content">Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default PrimaryLayout
