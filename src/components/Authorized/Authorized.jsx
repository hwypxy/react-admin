import React, { Component } from "react"
import { connect } from "react-redux"
import { getUserInfo, getUserMenu } from "./redux"
import Loading from "@comps/Loading"

@connect(null, { getUserInfo, getUserMenu })
class Authorized extends Component {
  state = {
    loading: true,
  }
  async componentDidMount() {
    const { getUserInfo, getUserMenu } = this.props
    await Promise.all([getUserInfo(), getUserMenu()])
    this.setState({ loading: false })
    // this.props.getUserInfo()
    // this.props.getUserMenu()
  }

  render() {
    return this.state.loading ? <Loading /> : this.props.render()
  }
}

export default Authorized
