import React, { useEffect, useState } from "react"
import { Router } from "react-router-dom"
import history from "@utils/history"

import { connect } from "react-redux"

import Layout from "./layouts"
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css"

// 国际化包
import { IntlProvider } from "react-intl"

// antd国际化
import { ConfigProvider } from "antd"
// antd提供的语言包
import enUS from "antd/es/locale/en_US"
import zhCN from "antd/es/locale/zh_CN"

// import Layout from "./layouts"

// 引入本地国际化包
import { en, zh } from "./locales"

// import { language } from "./redux/reducer"

function App(props) {
  const locale = props.language
  const message = locale === "en" ? en : zh
  const antdLocale = locale === "en" ? enUS : zhCN

  return (
    <Router history={history}>
      <ConfigProvider locale={antdLocale}>
        <IntlProvider locale={locale} messages={message}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  )
}

export default connect((state) => ({ language: state.language }))(App)
