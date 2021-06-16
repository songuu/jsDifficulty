/*
 * @Author: songyu
 * @Date: 2021-06-09 16:26:01
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-09 16:26:21
 */
import React from 'react'
export default class EventDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }
  handerChange(e) {
    setTimeout(() => {
      this.setState({
        value: e.target.value,
      })
    }, 0)
  }
  render() {
    return (
      <div>
        <input
          placeholder="请输入用户名？"
          onChange={this.handerChange.bind(this)}
        />
      </div>
    )
  }
}
