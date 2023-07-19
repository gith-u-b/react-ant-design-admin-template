import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import {connect} from 'react-redux'
import {ShowMenu} from '@/settings'

class MyBreadcrumb extends Component {
    render() {
        const {breadcrumb} = this.props
        return (
            <Breadcrumb style={{marginLeft: ShowMenu ? '' : '20px'}}>
                {
                    breadcrumb.map((item, index) => {
                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        );
    }
}

export default connect(
    state => ({
        breadcrumb: state.breadcrumb
    })
)(MyBreadcrumb);