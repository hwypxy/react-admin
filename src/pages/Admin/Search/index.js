import React, { Component } from "react"
import { Radio, Card } from "antd"

import "./index.less"

import {
  Chart,
  registerShape,
  Geom,
  Axis,
  Tooltip,
  Interval,
  Interaction,
  Coordinate,
  Legend,
  Annotation,
} from "bizcharts"

const data = [
  {
    type: "分类一",
    value: 20,
  },
  {
    type: "分类二",
    value: 18,
  },
  {
    type: "分类三",
    value: 32,
  },
  {
    type: "分类四",
    value: 15,
  },
  {
    type: "Other",
    value: 15,
  },
]

// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
const sliceNumber = 0.01

// 自定义 other 的图形，增加两条线
registerShape("interval", "sliceShape", {
  draw(cfg, container) {
    const points = cfg.points
    let path = []
    path.push(["M", points[0].x, points[0].y])
    path.push(["L", points[1].x, points[1].y - sliceNumber])
    path.push(["L", points[2].x, points[2].y - sliceNumber])
    path.push(["L", points[3].x, points[3].y])
    path.push("Z")
    path = this.parsePath(path)
    return container.addShape("path", {
      attrs: {
        fill: cfg.color,
        path: path,
      },
    })
  },
})

export default class Search extends Component {
  state = {
    value: 0,
  }

  handleBtnClick = () => {}

  handleRadioChange = (e) => {}

  DataClick = (e) => {
    let value
    if (e.data.data.click === false || e.data.data.click === undefined) {
      e.data.data.click = true
      value = e.data.data.value
    } else {
      e.data.data.click = false
      value = -e.data.data.value
    }

    this.setState({
      value: this.state.value + value,
    })
  }
  render() {
    const extra = (
      <>
        <Radio.Group defaultValue="all" onChange={this.handleRadioChange}>
          <Radio.Button value="all">全部渠道</Radio.Button>
          <Radio.Button value="online">线上</Radio.Button>
          <Radio.Button value="offline">门店</Radio.Button>
        </Radio.Group>
      </>
    )
    return (
      <div style={{ marginTop: "15px" }}>
        <Card title="销售额类型占比" extra={extra}>
          <Chart
            data={data}
            height={500}
            autoFit
            onIntervalClick={this.DataClick}
          >
            <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
            <Axis visible={false} />
            <Tooltip showTitle={false}>
              {(title, items) => {
                // items 是个数组，即被触发tooltip的数据。
                // 获取items的颜色
                const color = items[0].color
                return (
                  <div className="tooltip">
                    <span
                      className="dot"
                      style={{ backgroundColor: color }}
                    ></span>
                    <span style={{ marginRight: 5 }}>{title}</span>
                    <span>{items[0].value}</span>
                  </div>
                )
              }}
            </Tooltip>
            <Interval
              adjust="stack"
              position="value"
              color="type"
              shape="sliceShape"
            />
            <Interaction type="element-selected" />
            <Legend position="right"></Legend>
            <Annotation.Text
              position={["50%", "45%"]}
              content="销售量"
              style={{
                fontSize: 30,
                fontWeight: 700,
                textAlign: "center",
              }}
            />
            <Annotation.Text
              position={["50%", "55%"]}
              content={this.state.value}
              style={{
                fontSize: 30,
                fontWeight: 700,
                textAlign: "center",
              }}
            />
          </Chart>
        </Card>
      </div>
    )
  }
}