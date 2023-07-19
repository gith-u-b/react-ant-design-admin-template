import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

class MyBreadcrumb extends Component {
    state = {
        breadcrumb: []
    }
    componentDidMount(){
        // 初始化面包屑 刷新浏览器
        let breadcrumb = localStorage.getItem('breadcrumb')
        if(breadcrumb){
            this.setState({breadcrumb: JSON.parse(breadcrumb)})
        }
        // 订阅消息
        React.$PubSub.subscribe('keyPath', (_, breadcrumb) => {
            this.setState({breadcrumb})
            localStorage.setItem('breadcrumb', JSON.stringify(breadcrumb))
        })
    }
    componentWillUnmount() {
        // 取消订阅
        React.$PubSub.unsubscribe('keyPath')
    }
    render() {
        const {breadcrumb} = this.state
        return (
            <Breadcrumb>
                {
                    breadcrumb.map((item, index) => {
                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        );
    }
}

export default MyBreadcrumb;