import React, { Component } from "react"

import { Row, Col, Statistic, Progress } from "antd"
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons"

import { AreaChart, ColumnChart } from "bizcharts"

import Card from "@comps/Card"
// import Visits from "./Visits"
// import Bar from "./Bar"

const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 },
}

// 数据源 面积图数据
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 5 },
  { year: "1999", value: 6 },
]

// 数据源 柱状图数据
const columnsData = [
  {
    type: "家具家电",
    sales: 38,
  },
  {
    type: "粮油副食",
    sales: 52,
  },
  {
    type: "生鲜水果",
    sales: 61,
  },
  {
    type: "美容洗护",
    sales: 145,
  },
  {
    type: "母婴用品",
    sales: 48,
  },
  {
    type: "进口食品",
    sales: 38,
  },
  {
    type: "食品饮料",
    sales: 38,
  },
  {
    type: "家庭清洁",
    sales: 38,
  },
]

export default class Analysis extends Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    this.setState({
      loading: true,
    })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000)
  }

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
            >
              <AreaChart
                data={data} //表示数据源
                // title={{  //定义图标的title
                //   visible: true,
                //   text: '面积图',
                // }}
                xField="year" // 表示水平方向展示数据中的哪个字段
                yField="value" // 表示垂直方向展示数据中的那个字段
                xAxis={{
                  visible: false,
                }}
                yAxis={{
                  visible: false,
                }}
                smooth={true} // 表示图标是否是曲线展示数据
                padding="0"
                forceFit={true} // 让图标自适应容器的宽高,会导致width和height失效 默认值就是true
                color={["hotpink"]}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title="支付笔数" value={333333} />}
              footer={<span>转化率60%</span>}
              // loading={this.state.loading}
            >
              <ColumnChart
                data={columnsData}
                // title={{
                //   visible: true,
                //   text: '基础柱状图'
                // }}
                xAxis={{
                  visible: false,
                }}
                yAxis={{
                  visible: false,
                }}
                forceFit
                padding="0"
                xField="type"
                yField="sales"
                // 给图表数据源起别名
                meta={{
                  type: {
                    alias: "类别",
                  },
                  sales: {
                    alias: "销售额(万)",
                  },
                }}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title="运营结果" value={112893} />}
              footer={<span>转化率 80.9%</span>}
            >
              <Progress
                percent={80.9} // 进度值
                strokeColor={{
                  //渐变颜色
                  from: "#108ee9",
                  to: "#87d068",
                }}
                status="active" //闪烁效果
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
