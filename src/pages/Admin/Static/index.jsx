import React, { Component } from "react"
import { Card, Tabs } from 'antd'

import { RingProgressChart } from 'bizcharts'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from 'bizcharts'

import './index.less'

const { TabPane } = Tabs

// 数据
const data = [
  {
    month: 'Jan',
    city: 'Tokyo',
    temperature: 7
  },
  {
    month: 'Jan',
    city: 'London',
    temperature: 3.9
  },
  {
    month: 'Feb',
    city: 'Tokyo',
    temperature: 6.9
  },
  {
    month: 'Feb',
    city: 'London',
    temperature: 4.2
  },
  {
    month: 'Mar',
    city: 'Tokyo',
    temperature: 9.5
  },
  {
    month: 'Mar',
    city: 'London',
    temperature: 5.7
  },
  {
    month: 'Apr',
    city: 'Tokyo',
    temperature: 14.5
  },
  {
    month: 'Apr',
    city: 'London',
    temperature: 8.5
  },
  {
    month: 'May',
    city: 'Tokyo',
    temperature: 18.4
  },
  {
    month: 'May',
    city: 'London',
    temperature: 11.9
  },
  {
    month: 'Jun',
    city: 'Tokyo',
    temperature: 21.5
  },
  {
    month: 'Jun',
    city: 'London',
    temperature: 15.2
  },
  {
    month: 'Jul',
    city: 'Tokyo',
    temperature: 25.2
  },
  {
    month: 'Jul',
    city: 'London',
    temperature: 17
  },
  {
    month: 'Aug',
    city: 'Tokyo',
    temperature: 26.5
  },
  {
    month: 'Aug',
    city: 'London',
    temperature: 16.6
  },
  {
    month: 'Sep',
    city: 'Tokyo',
    temperature: 23.3
  },
  {
    month: 'Sep',
    city: 'London',
    temperature: 14.2
  },
  {
    month: 'Oct',
    city: 'Tokyo',
    temperature: 18.3
  },
  {
    month: 'Oct',
    city: 'London',
    temperature: 10.3
  },
  {
    month: 'Nov',
    city: 'Tokyo',
    temperature: 13.9
  },
  {
    month: 'Nov',
    city: 'London',
    temperature: 6.6
  },
  {
    month: 'Dec',
    city: 'Tokyo',
    temperature: 9.6
  },
  {
    month: 'Dec',
    city: 'London',
    temperature: 4.8
  }
]
const cols = {
  month: {
    range: [0, 1]
  }
}

export default class Static extends Component {
  render() {
    return (
      <div>
        <Card
          title={
            <Tabs
            defaultActiveKey='1'
            tabPosition={'top'}
            style={{ height: 600 }}
          >
            {[...Array(30).keys()].map(i => (
              //   tab属性,表示页签
              <TabPane
                  tab={
                    <>
                      <div>{`store-${i}`}</div>
                      <RingProgressChart
                        width={50}
                        height={50}
                        percent={Math.random()}
                      />
                    </>
                  }
                  key={i}
                  disabled={i === 28}
                >
                  <Chart
                    height={400}
                    data={data}
                    scale={cols}
                    autoFit
                    padding='0'
                  >
                    <Legend position={'top'} />
                    <Axis name='month' />
                    <Axis
                      name='temperature'
                      label={{
                        formatter: val => `${val}°C`
                      }}
                    />
                    <Tooltip/>
                 
                    <Geom
                      type='line' 
                      position='month*temperature'
                      size={4} 
                      color={'city'} 
                      shape={'smooth'} 
                      style={{
                        stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
                      }}
                    />
                    <Geom
                      type='point' 
                      position='month*temperature'
                      size={4}
                      shape={'circle'} 
                      color={'city'} 
                    />
                  </Chart>
                </TabPane>
              ))}
            </Tabs>
          }
        ></Card>
      </div>
    )
  }
}
