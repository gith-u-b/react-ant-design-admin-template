import React, { Component } from 'react';
import {Spin} from 'antd'

class MyLoading extends Component {
    render() {
        return (
            <div className='w100 h100 flex-row-center-center'>
                <Spin tip="加载中..."></Spin>
            </div>
        );
    }
}

export default MyLoading;