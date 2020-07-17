import React, { Component } from "react"

import { Row, Col, Statistic } from "antd"
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons"

import Card from "@comps/Card"
// import Visits from "./Visits"
// import Bar from "./Bar"

const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 },
}

export default class Analysis extends Component {
  render() {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col {...firstRowCol}>
            <Card
              title={
                <Statistic title="总销售额" value={112893} prefix={"￥"} />
              }
              footer={<span>日销售额 ￥12,423</span>}
            >
              <span>
                周同比 12% <CaretUpOutlined style={{ color: "red" }} />
              </span>
              <span style={{ marginLeft: 10 }}>
                日同比 10% <CaretDownOutlined style={{ color: "pink" }} />
              </span>
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              title={
                <Statistic title="总销售额" value={112893} prefix={"￥"} />
              }
              footer={<span>日销售额 ￥12,423</span>}
            ></Card>
          </Col>
          <Col {...firstRowCol}>
            <Card></Card>
          </Col>
          <Col {...firstRowCol}>
            <Card></Card>
          </Col>
        </Row>
      </div>
    )
  }
}
