import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import routes from '@/routes'
import '@/style/layout.scss'

const { Content } = Layout

const DefaultLayout = (props) => {
    const [] = useState((prevState) => {})

    useEffect(() => {})

    return (
        <Layout className='app'>
            <Layout style={{ minHeight: '100vh' }}>
                <Content className='content'>
                    <Switch>
                        {routes.map((item) => {
                            return (
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    exact={item.exact}
                                    render={(props) => <item.component {...props} />}></Route>
                            )
                        })}
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

export default withRouter(DefaultLayout)
