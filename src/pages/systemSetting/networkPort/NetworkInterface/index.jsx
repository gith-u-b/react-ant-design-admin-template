import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import MyTable from '@/compontens/MyTable';
import MyPagination from '@/compontens/MyPagination';
import EditModal from './EditModal';

class NetworkInterface extends Component {
    state = {
        pageObj: {
            total: 0,
            current: 1,
            pageSize: 10,
            onChange: (page, pageSize) => {this.onPageChange(page, pageSize)}
        },
        tableObj: {
            dataSource: [],
            columns: [
                {
                    title: '名称',
                    dataIndex: 'Name',
                    key: 'Name',
                },
                {
                    title: '类型',
                    dataIndex: 'type',
                    key: 'type',
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    render: (text, record, index) => {
                        return <a onClick={() => this.tableRowEdit(record, index)}>修改</a>
                    }
                }
            ],
            loading: false
        },
        form: {}
    }
    // 发布消息-弹框是否显示
    modalAction = (type) => {
        PubSub.publish('manualModal', type)
    }
    onPageChange = (page, pageSize) => {
        const { tableObj, pageObj } = this.state
        const newPage = {...pageObj, current: page, pageSize: pageSize}
        this.setState({pageObj: newPage})
    }
    tableRowEdit = (row, index) => {
        this.setState({
            form: row
        })
        this.modalAction(true)
    }
    saveUpdate = (params) => {

    }

    getTableData () {
        this.changeTableLoad(true)
        setTimeout(()=>{
        this.changeTableLoad(false)
            
        }, 200)
    }
    changeTableLoad = (loading) => {
        const tableObj = Object.assign({}, this.state.tableObj, {loading: loading})
        this.setState({tableObj: tableObj})
    }
    componentDidMount () {
        this.getTableData()
    }
    render() {
        const { tableObj, pageObj, form } = this.state
        return (
            <div className="w100 h100">
                <MyTable {...tableObj}/>
                <MyPagination {...pageObj}/>
                <EditModal form={form} saveUpdate={this.saveUpdate}/>
            </div>
        );
    }
}

export default NetworkInterface;