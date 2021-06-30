import React from 'react'
import { Layout, Row, Col, Icon, Divider } from 'antd'
import screenfull from 'screenfull'
import '@/style/view-style/index.scss'

const Index = () => {
    const fullToggle = () => {
        if (screenfull.isEnabled) {
            screenfull.request(document.getElementById('bar'))
        }
    }
    return (
        <Layout className='index animated fadeIn'>
            <Row gutter={24} className='index-header'>
                <Col span={6}>
                    <div className='base-style wechat'>
                        <Icon type='wechat' className='icon-style' />
                        <div>
                            <span>999</span>
                            <div>微信</div>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className='base-style qq'>
                        <Icon type='qq' className='icon-style' />
                        <div>
                            <span>366</span>
                            <div>QQ</div>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className='base-style dingding'>
                        <Icon type='dingding' className='icon-style' />
                        <div>
                            <span>666</span>
                            <div>钉钉</div>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className='base-style weibo'>
                        <Icon type='weibo' className='icon-style' />
                        <div>
                            <span>689</span>
                            <div>微博</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

export default Index
