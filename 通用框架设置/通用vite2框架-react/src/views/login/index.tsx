import React from 'react'
import {Form, Button, Input, Spin, notification} from 'antd'
import {login} from 'store/actions'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import Icon from 'comps/Icon'
import {HttpStatusCode} from 'apis/index'
import './index.less'

type ILoginProps = RouteComponentProps

const Login: React.FC<ILoginProps & ActionProps> = props => {
  const {login, history} = props

  const formSubmit = (values: any) => {
    login(values.username.trim(), values.password.trim()).then((data: any) => {
      if (data.code === HttpStatusCode.OK) {
        notification.success({
          message: '登录成功',
          description: '欢迎回来',
          duration: 3,
        })
        history.push('/dashboard')
      }
    })
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">用户登录</h2>
        <Spin spinning={false}>
          <Form name="login-form" size="middle" onFinish={formSubmit}>
            <Form.Item
              name="email"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ]}
            >
              <Input prefix={<Icon icon="UserOutlined" />} placeholder="邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input
                type="password"
                prefix={<Icon icon="LockOutlined" />}
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

interface ActionProps {
  login: any
}

export default connect(null, {login})(withRouter(Login))
