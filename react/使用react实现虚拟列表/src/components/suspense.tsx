/*
 * @Author: songyu
 * @Date: 2021-06-09 15:40:38
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-09 15:43:06
 */

import React from 'react'
export default class Suspense extends React.Component {
  state = { isRender: true }
  componentDidCatch(e: any) {
    /* 异步请求中，渲染 fallback */
    this.setState({ isRender: false })
    const { p } = e
    Promise.resolve(p).then(() => {
      /* 数据请求后，渲染真实组件 */
      this.setState({ isRender: true })
    })
  }
  render() {
    const { isRender } = this.state
    const { children, fallback } = this.props
    return isRender ? children : fallback
  }
}
