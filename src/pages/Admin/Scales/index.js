import React, { Component } from "react"

import { Card, Button, DatePicker } from "antd"

import "./index.less"

import moment from "moment"

const { RangePicker } = DatePicker

const tabList = [
  {
    key: "scales",
    tab: "销售量",
  },
  {
    key: "visits",
    tab: "访问量",
  },
]

const contentList = {
  scales: <p>销售量...</p>,
  visits: <p>访问量....</p>,
}

export default class Scales extends Component {
  state = {
    activeKey: "scales",
    actionBtn: "day",
    rangeDate: [moment(), moment()],
  }

  onTabChange = (key, type) => {
    console.log(key, type)
    this.setState({ [type]: key })
  }

  // btn按钮
  handleBtnClick = (actionBtn) => () => {
    let rangeDate
    switch (actionBtn) {
      case "day":
        rangeDate = [moment(), moment()]
        break
      case "week":
        rangeDate = [moment(), moment().add(1, "w")]
        break
      case "month":
        rangeDate = [moment(), moment().add(1, "M")]
        break
      case "year":
        rangeDate = [moment(), moment().add(1, "y")]
        break
    }

    this.setState({
      actionBtn,
      rangeDate,
    })
  }

  handleChangeDate = (rangeDate) => {
    //#region
    // switch (this.state.actionBtn) {
    //   case "day":
    //     rangeDate[1] = rangeDate[0]
    //     console.log(1, rangeDate)
    //     break
    //   case "week":
    //     rangeDate[1] = rangeDate[0].add(1, "w")
    //     console.log(2, rangeDate)
    //     break
    //   case "month":
    //     rangeDate[1] = rangeDate[0].add(1, "M")
    //     console.log(3, rangeDate)
    //     break
    //   case "year":
    //     rangeDate[1] = rangeDate[0].add(1, "y")
    //     console.log(4, rangeDate)
    //     break
    // }
    //#endregion
    this.setState({
      rangeDate,
    })
  }

  render() {
    let { actionBtn, rangeDate } = this.state
    const extra = (
      <>
        <Button
          type={actionBtn === "day" ? "link" : "text"}
          onClick={this.handleBtnClick("day")}
        >
          今日
        </Button>
        <Button
          type={actionBtn === "week" ? "link" : "text"}
          onClick={this.handleBtnClick("week")}
        >
          本周
        </Button>
        <Button
          type={actionBtn === "month" ? "link" : "text"}
          onClick={this.handleBtnClick("month")}
        >
          本月
        </Button>
        <Button
          type={actionBtn === "year" ? "link" : "text"}
          onClick={this.handleBtnClick("year")}
        >
          本年
        </Button>
        <RangePicker
          value={rangeDate}
          onCalendarChange={this.handleChangeDate}
        />
      </>
    )
    return (
      <>
        <Card
          style={{ width: "100%" }}
          tabList={tabList}
          activeTabKey={this.state.activeKey}
          tabBarExtraContent={extra}
          onTabChange={(key) => {
            this.onTabChange(key, "activeKey")
          }}
        >
          {contentList[this.state.activeKey]}
        </Card>
      </>
    )
  }
}
