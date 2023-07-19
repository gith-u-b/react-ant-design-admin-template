import React, { Component } from 'react';
import { Table } from 'antd';

class MyTable extends Component {
    render() {
        const { bordered, dataSource, columns, size, loading } = this.props
        return (
            <Table 
                bordered={bordered || true}
                dataSource={dataSource} 
                columns={columns} 
                pagination={false}
                loading={loading}
                size={size || 'small'}
            />
        )
    }
}

export default MyTable;