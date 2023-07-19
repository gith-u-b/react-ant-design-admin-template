import React, { Component } from 'react';
import { Menu } from 'antd';
import { UserOutlined, MailOutlined, PieChartOutlined } from '@ant-design/icons';
import {menuJson, getMenuFirstLevelId, getOpenKeysForId, getKeyPathTitle} from '@/utils/menu.js'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateOpenkeys, updateSelectedkeys } from '@/reduct/actions/menu'
import { updateBreadcrumb } from '@/reduct/actions/breadcrumb'
import { updateTabsView } from '@/reduct/actions/tabsView'


// 获取菜单一级节点id，用于展开/关闭
const rootSubmenuKeys = getMenuFirstLevelId()

// 获取菜单结构
const items = menuItems()
function menuItems() {
    return menuJson.map((item, index)=>{
        return item.children && item.children.length > 0 ? renderSubMenu(item, true) : renderMenuItem(item, true)
    })
}
// 菜单有子结构
function renderSubMenu(item, type) {
    // type 第一级菜单有图标
    let child = item.children.map((chilItem, childIndex)=>{
        return chilItem.children && chilItem.children.length > 0 ? renderSubMenu(chilItem) : renderMenuItem(chilItem)
    })
    return getItem(item.name, item.id, type ? <PieChartOutlined /> : '', child)
}
// 菜单无子结构
function renderMenuItem(item, type) {
    return getItem(item.name, item.id, type ? <PieChartOutlined /> : '')
}

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

class ViewMenu extends Component {
    state = {
        menuTheme: 'dark',
        openKeys: [],
    }
    // 首次加载或菜单隐藏再次打开时，与本地存储状态进行同步
    initOpenKeys = () => {
        this.setState({
            openKeys: this.props.openKeys
        })
    }
    // 菜单展开关闭事件
    onOpenChange = (keys) => {
        let {openKeys: stateOpenKeys} = this.state
        const latestOpenKey = keys.find((key) => stateOpenKeys.indexOf(key) === -1);
        let openKeys = rootSubmenuKeys.indexOf(latestOpenKey) === -1 ? keys : latestOpenKey ? [latestOpenKey] : []
        this.setState({openKeys})
    }
    // 点击菜单事件
    menuClick = ({ item, key, keyPath, domEvent }) => {
        if(keyPath[0] == this.props.location.pathname) return
        // 编程式路由跳转
        this.props.history.push(keyPath[0])
        // // 菜单展开及选中判断
        // let {openKeys} = this.state
        // let saveOk = openKeys
        // // 有展开项时
        // if(openKeys.length != 0){
        //     if(keyPath.length - openKeys.length == 1){
        //         // 如果长度相差1，则在同一菜单层级
        //         // saveOk = openKeys
        //     }else if(keyPath.length == openKeys.length){
        //         // 如果长度相等，则打开层级多一级
        //         saveOk.splice(saveOk.length-1, 1)
        //     }else if(keyPath.length < openKeys.length){
        //         saveOk = []
        //     }
        // }
        // this.undateMenuCommon(saveOk, keyPath)
    }
    // 更新状态公告方法
    undateMenuCommon = (openKeys, keyPath) => {
        // 菜单左侧折叠，禁止展开
        if(!this.props.collapsed){
            // 当点击菜单进行路由跳转时，存储展开项
            this.setState({openKeys})
        }
        // 本地存储
        this.props.updateOpenkeys(openKeys)
        this.props.updateSelectedkeys(keyPath)

        let kpr = JSON.parse(JSON.stringify(keyPath))
        // 存储菜单名称
        let title = getKeyPathTitle(kpr.reverse())
        this.props.updateBreadcrumb(title)

        // 添加选项卡
        let {panes} = this.props,
            isPush = true
        for(var i in panes){
            if(panes[i].key == keyPath[0]){
                isPush = false
                break
            }
        }
        if(isPush){
            panes.push({
                title: title[title.length-1],
                key: keyPath[0],
                openKeys,
                selectedKeys: keyPath,
                breadcrumb: title
            })
            this.props.updateTabsView(JSON.parse(JSON.stringify(panes)))
        }
    }
    // 路由监听
    routerListen = () => {
        // 订阅路由改变
        this.pubsubToken = React.$PubSub.subscribe('routeChange', (_, path)=>{
            // 跳转重定向，不进行选项卡存储
            if(path == '/redirect') return
            const openKeys = getOpenKeysForId(path)
            const keyPath = [...openKeys, path]
            this.undateMenuCommon(openKeys, keyPath.reverse())
        })
        
        // this.props.history.listen(location=>{
        //     console.log('当前route：'+this.props.location.pathname)
        //     console.log('点击route：'+location.pathname)
        //     const path = location.pathname
        //     // 判断当前路由地址 和 发生变化后的 路由地址 是否一致
        //     if(this.props.location.pathname!==location.pathname){
        //         // 不一致的请情况下可以触发函数进行处理
        //         // console.log('路由不一致啦')
        //     }else{
        //         // 路由一致时，
        //         //     情况一：一个路由点击多次；
        //         //     情况二：操作浏览器的前进及回退
        //         const openKeys = getOpenKeysForId(path)
        //         const keyPath = [...openKeys, path]
        //         this.undateMenuCommon(openKeys, keyPath.reverse())
        //     }
        // })
    }
    componentDidMount() {
        // 将组件实例返回到父组件
        this.props.onRef(this)

        // 初始化openKeys
        this.initOpenKeys()

        // 路由监听
        this.routerListen()

    }
    componentWillUnmount() {
        // 取消订阅：
        React.$PubSub.unsubscribe(this.pubsubToken)
    }
    render() {
        const {menuTheme, openKeys} = this.state
        const {selectedKeys} = this.props
        return (
            <Menu 
                className="view_menu" 
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onOpenChange={this.onOpenChange}
                onClick={this.menuClick}
                theme={menuTheme} 
                mode="inline" 
                items={items}
            >
            </Menu>
        )
    }
}
export default connect(
    state => ({
        openKeys: state.openKeys,
        selectedKeys: state.selectedKeys,
        panes: state.tabsView,
    }),
    {
        updateOpenkeys,
        updateSelectedkeys,
        updateBreadcrumb,
        updateTabsView
    }
)(withRouter(ViewMenu))