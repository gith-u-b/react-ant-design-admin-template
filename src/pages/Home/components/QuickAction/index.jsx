import React, { Component } from 'react'
import {withRouter} from 'react-router'
import Icon, { DatabaseFilled, LayoutFilled, MailFilled, TableOutlined, PicCenterOutlined } from '@ant-design/icons';
import './index.css'
class QuickAction extends Component {
    state = {
        list: [
            {title: 'Layout 布局', icon: LayoutFilled, path: '/layout', iconColor: '#00DDFF'},
            {title: '基础表单', icon: MailFilled, path: '/basicForm', iconColor: '#37A2FF'},
            {title: '基础列表', icon: TableOutlined, path: '/basicTable', iconColor: '#FF0087'},
            {title: '走马灯', icon: PicCenterOutlined, path: '/rotation', iconColor: '#FFBF00'},
        ]
    }
    go = (item) => {
        this.props.history.push(item.path)
    }
    render() {
        let {list} = this.state
        return (
            <div className='flex-row flex-wrap aciton-content w100 h100'>
                {
                    list.map((item,index)=>{
                        return <div className='aciton-item flex-column' key={index} onClick={c => this.go(item)}>
                                    <Icon component={item.icon} style={{
                                        color: item.iconColor
                                    }}></Icon>
                                    <span>{item.title}</span>
                                </div>
                    })
                }
            </div>
        )
    }
}
export default withRouter(QuickAction)
