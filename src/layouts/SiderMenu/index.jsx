import React, { Component } from "react"
import { connect } from "react-redux"
import { Layout, Menu, Breadcrumb } from "antd"
import { Link, withRouter } from "react-router-dom"
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

import Icons from "@conf/icons"

import { defaultRoutes } from "@conf/routes"

const { SubMenu } = Menu

@withRouter
@connect((state) => ({ permissionList: state.user.permissionList }))
class SiderMenu extends Component {
  renderMenu = (menus) => {
    return menus.map((menu) => {
      if (menu.hidden) return
      const Icon = Icons[menu.icon]
      // 将要展示
      if (menu.children && menu.children.length) {
        // 二级菜单
        return (
          <SubMenu key={menu.path} icon={<Icon />} title={menu.name}>
            {menu.children.map((secMenu) => {
              if (secMenu.hidden) return
              return (
                <Menu.Item key={secMenu.path}>
                  <Link to={menu.path + secMenu.path}>{secMenu.name}</Link>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={menu.path} icon={<Icon />}>
            {menu.path === "/" ? <Link to="/">{menu.name}</Link> : menu.name}
          </Menu.Item>
        )
      }
    })
  }

  render() {
    const path = this.props.location.pathname
    const reg = /[/][a-z]*/
    const firstPath = path.match(reg)[0]
    return (
      <>
        <Menu
          theme="dark"
          defaultSelectedKeys={[path]}
          mode="inline"
          defaultOpenKeys={[firstPath]}
        >
          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}
        </Menu>
      </>
    )
  }
}

export default SiderMenu
