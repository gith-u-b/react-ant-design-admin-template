import React, { Component } from 'react';
import { Menu } from 'antd';
import {menuJson} from '@/utils/menu.js'
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateKeyPath } from '@/reduct/actions/menu'

const {Item, SubMenu} = Menu
class ViewMenu extends Component {
    state = {
        menuTheme: 'dark',
        rootSubmenuKeys: [],
        openKeys: [], // 展开项
        selectedKeys: [], // 选中项
    }
    // 菜单展开关闭事件
    onOpenChange = (keys) => {
        let {rootSubmenuKeys, openKeys: stateOpenKeys} = this.state
        const latestOpenKey = keys.find((key) => stateOpenKeys.indexOf(key) === -1);
        let openKeys = rootSubmenuKeys.indexOf(latestOpenKey) === -1 ? keys : latestOpenKey ? [latestOpenKey] : []
        this.setState({openKeys})
    }
    // 更新菜单选中及展开状态
    undateMenu = () => {
        let openKeys = localStorage.getItem('openKeys') ? JSON.parse(localStorage.getItem('openKeys')) : [],
            selectedKeys = localStorage.getItem('selectedKeys') ? JSON.parse(localStorage.getItem('selectedKeys'))  : ['1']

        this.setState({
            openKeys,
            selectedKeys
        })
        localStorage.setItem('selectedKeys', JSON.stringify(selectedKeys))
        localStorage.setItem('openKeys', JSON.stringify(openKeys))
    }
    // 点击菜单事件
    menuClick = ({ item, key, keyPath, domEvent }) => {
        let {openKeys} = this.state
        let saveOk = openKeys
        // 有展开项时
        if(openKeys.length != 0){
            if(keyPath.length - openKeys.length == 1){
                // 如果长度相差1，则在同一菜单层级
                // saveOk = openKeys
            }else if(keyPath.length == openKeys.length){
                // 如果长度相等，则打开层级多一级
                saveOk.splice(saveOk.length-1, 1)
            }else if(keyPath.length < openKeys.length){
                saveOk = []
            }
        }
        this.setState({selectedKeys: keyPath, openKeys: saveOk})
        localStorage.setItem('selectedKeys', JSON.stringify(keyPath))
        localStorage.setItem('openKeys', JSON.stringify(saveOk))
        this.getKeyPathTitle(keyPath.reverse(), menuJson)
    }
    // 更新面包屑显示文字
    getKeyPathTitle = (keyPath, menuJson) => {
        let title = []
        keyPath.forEach(item => {
            let str = this.returnName(menuJson, item)
            title.push(str)
        })
        // 发布消息
        React.$PubSub.publish('keyPath', title)
    }
    returnName = (data, value)=>{
        let name = ''
        for(var i in data){
            if(data[i].id == value){
                name = data[i].name
            }
            if(!name && data[i].children.length > 0){
                name = this.returnName(data[i].children, value)
            }
            if(name) {
                break
            }
        }
        return name
    }
    renderSubMenu = ({id, name, path, children}) => {
        return (
            <SubMenu key={id} title={name} icon={<MailOutlined />}>
                {
                    children && children.map(item => {
                        return item.children && item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </SubMenu>
        )
    }
    renderMenuItem = ({id, name, path, children}) => {
        return (
            <Item key={id}>
                <Link to={path}>
                    {/* {icon && <Icon type={icon}/>} */}
                    <MailOutlined />
                    <span>{name}</span>
                </Link>
            </Item>
        )
    }
    componentDidMount() {
        // 将组件实例返回到父组件
        this.props.onRef(this)

        // 获取菜单一级节点id，用于展开/关闭
        let arr = []
        menuJson.forEach(item=>{
            arr.push(item.id)
        })
        this.setState({
            rootSubmenuKeys: arr
        })

        // 初始化更新菜单选中及展开情况
        this.undateMenu()

        // 面包屑 首次打开，默认第一项
        let breadcrumb = localStorage.getItem('breadcrumb')
        if(!breadcrumb){
            localStorage.setItem('breadcrumb', '["'+menuJson[0].name+'"]')
        }

        // 路由监听
        this.props.history.listen(location=>{
            console.log('当前route：'+this.props.location.pathname)
            console.log('点击route：'+location.pathname)
            // 判断当前路由地址 和 发生变化后的 路由地址 是否一致
            if(this.props.location.pathname!==location.pathname){
                // 不一致的请情况下可以触发函数进行处理

            }
        })
    }
    render() {
        const {menuTheme, selectedKeys, openKeys} = this.state
        return (
            <Menu 
                className="view_menu" 
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onOpenChange={this.onOpenChange}
                onClick={this.menuClick}
                theme={menuTheme} 
                mode="inline" 
            >
                {
                    menuJson.map(item => {
                        return item.children && item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>
        )
    }
}
export default connect(
    state => ({
        keyPath: state.menu
    }),
    {
        updateKeyPath
    }
)(withRouter(ViewMenu))