import React, { Component } from 'react';
import { Pagination } from 'antd';

class MyPagination extends Component {
    render() {
        const { total, current, pageSize, defaultCurrent, disabled, defaultPageSize, hideOnSinglePage, showSizeChanger, onChange } = this.props
        return (
            <Pagination
                className="ant-table-pagination ant-table-pagination-right"
                total = {total}
                current = {current}
                pageSize = {pageSize} 
                defaultCurrent = {defaultCurrent || 1} // 默认的当前页数
                defaultPageSize = {defaultPageSize || 10} // 默认的每页条数
                disabled = {disabled || false} // 禁用分页
                hideOnSinglePage = {hideOnSinglePage || false} // 只有一页时是否隐藏分页器
                showSizeChanger = {showSizeChanger || true} // 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
                onChange = {onChange}
                showTotal = {total => `共${total}条`}
            />
        )
    }
}

export default MyPagination;