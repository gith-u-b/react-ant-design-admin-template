import React, {Component} from "react";
import { Menu, Dropdown, Button, Avatar } from 'antd';
import './index.css'
import {removeToken} from '@/utils/auth'

export default class NavBar extends Component {
    menuItem = () => {
        return <Menu
            items={[
                {
                    label: (
                        <div onClick={this.logout}>退出登录</div>
                    )
                },
            ]}
        />
    }
    logout = (event) => {
        removeToken()
        window.location.href = '/'
    }
    render() {
        return (
            <div className="flex-row-start-center navbar">
                <Avatar src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" />&nbsp;&nbsp;
                <Dropdown 
                    overlay={this.menuItem()} 
                    placement="bottom" 
                    arrow={{ pointAtCenter: true }}>
                    <span>admin</span>
                </Dropdown>
            </div>
        )
    }
}