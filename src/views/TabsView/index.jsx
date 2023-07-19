import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import { Tabs, Button } from 'antd';
import { updateTabsView } from '@/reduct/actions/tabsView'
import { updateOpenkeys, updateSelectedkeys } from '@/reduct/actions/menu'
import { updateBreadcrumb } from '@/reduct/actions/breadcrumb'
import './index.css'

const { TabPane } = Tabs;

class TabsView extends Component {
    state = {
        selectedTag: {},
        show: false,
        left: 0,
        top: 0,
    }
    // 选项卡选中事件
    onChange = activeKey => {
        if(this.state.selectedTag.path != activeKey){
            this.setState({show: false})
        }
        this.props.history.push(activeKey)
    }
    // 事件映射
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    // 删除选中项
    remove = targetKey => {
        let { selectedKeys, panes, updateTabsView, history } = this.props;
        const activeKey = selectedKeys && selectedKeys.length ? selectedKeys[0] : ''
        // 移除项为当前打开项，删除并打开上次路由
        let i = panes.findIndex(item => item.key === targetKey)
        panes.splice(i, 1)
        updateTabsView(JSON.parse(JSON.stringify(panes)))

        // 关闭项正好是打开项，则删除当前项，打开后一个
        // 关闭项是最后一项，则打开前一项
        if(targetKey == activeKey){
            this.redirectPath(panes[i] ? panes[i].key : panes[i-1].key )
        }
    }
    // 是否显示关闭当前
    isAffix() {
        let {selectedTag} = this.state
        return selectedTag.isSelected
    }
    // 是否显示关闭左侧
    isFirstView() {
        return this.returnClickTabIndex() > 1
    }
    // 是否显示关闭右侧
    isLastView() {
        let {panes} = this.props
        return this.returnClickTabIndex() < panes.length-1
    }
    // 返回当前点击行对应下标
    returnClickTabIndex = () => {
        let {selectedTag} = this.state
        let {panes} = this.props
        let n = 0
        for(var i in panes){
            if(panes[i].key == selectedTag.path){
                n = i
                break
            }
        }
        return n
    }
    // 路由跳转重定向
    redirectPath = (redirect) => {
        this.props.history.push('/redirect', { redirect })
    }
    // 刷新页面
    refreshSelectedTag = () => {
        let {selectedTag} = this.state
        this.redirectPath(selectedTag.path)
    }
    // 关闭当前
    closeSelectedTag = () => {
        this.remove(this.state.selectedTag.path)
    }
    // 关闭其他
    closeOthersTags = () => {
        let {panes, updateTabsView} = this.props
        let {selectedTag: {path, isSelected}} = this.state
        let arr = panes.filter(pane => {
            return (pane.closable != undefined && !pane.closable) || pane.key == path
        })
        updateTabsView(JSON.parse(JSON.stringify(arr)))
        // 若当前项不是打开项，则路由跳转到此页面
        if(!isSelected){
            this.redirectPath(path)
        }
    }
    // 关闭左侧
    closeLeftTags = () => {
        let {panes, updateTabsView} = this.props
        let {selectedTag: {path, isSelected}} = this.state
        let n = 0
        let arr = panes.filter((pane, index) => {
            if(pane.key == path){
                n = index
            }
            return (pane.closable != undefined && !pane.closable) || pane.key == path || (index > n && n != 0)
        })
        updateTabsView(JSON.parse(JSON.stringify(arr)))
        // 若当前项不是打开项，则路由跳转到此页面
        if(!isSelected){
            this.redirectPath(path)
        }
    }
    // 关闭右侧
    closeRightTags = () => {
        let {panes, updateTabsView} = this.props
        let {selectedTag: {path, isSelected}} = this.state
        let n = 0,
            isSave = false
        let arr = panes.filter((pane, index) => {
            if(pane.key == path){
                n = index + 1
                isSave = true
            }else{
                if(!isSave) n++
            }
            return (pane.closable != undefined && !pane.closable) || pane.key == path || index <= n - 1
        })
        updateTabsView(JSON.parse(JSON.stringify(arr)))
        // 若当前项不是打开项，则路由跳转到此页面
        if(!isSelected){
            this.redirectPath(path)
        }
    }
    // 全部关闭
    closeAllTags = () => {
        let {panes, updateTabsView} = this.props
        let arr = panes.filter((pane, index) => {
            return pane.closable != undefined && !pane.closable
        })
        updateTabsView(JSON.parse(JSON.stringify(arr)))
        this.redirectPath(arr[0].key)
    }
    // 右击事件
    _handleContextMenu = (event) => {
        event.preventDefault();
        let dom = this.findParentNode(event.target)
        if(!dom) return
        let routeDom = dom.firstChild
        let selectedTag = {
            path: '/' + routeDom.getAttribute('id').split('/').slice(1).join('/'),
            title: routeDom.textContent,
            isSelected: routeDom.getAttribute('aria-selected') == 'true' ? true : false,
        }
        this.setState({
            left: dom.offsetLeft,
            top: dom.offsetHeight + 10,
            show: true,
            selectedTag
        })
    }
    // 找到点击节点对应选项卡最外层结构
    findParentNode = (domNode) => {
        let {className} = domNode
        if(className.includes('ant-tabs-nav-wrap') || className.includes('ant-tabs-nav') || className.includes('ant-tabs-dropdown-menu-item')) return false
        if((className.includes('ant-tabs-tab') && !domNode.getAttribute('role'))){
            return domNode
        }else{
            return this.findParentNode(domNode.parentNode)
        }
    }
    // 点击其他位置需要隐藏菜单
    handleClick = (event) => {
        const wasOutside = !(event.target.contains === this.contextMenu);
        if (wasOutside) this.setState({show: false});
    }
    // 选项卡滚动，隐藏菜单
    handleScroll = () => {
        let {show} = this.state
        if (show) this.setState({show: false});
    }
    // // 重写选项卡，便于添加右击事件：结构采用TabPane编译后的结构样式
    // // 缺点：无法使用原组件的滚动下拉，需自行编写
    // renderTabBar = (props, DefaultTabBar) => {
    //     let {panes} = props
    //     return <div className="ant-tabs-nav" style={{marginBottom: '0px', padding:'5px 10px' }}>
    //         <div className='ant-tabs-nav-wrap'>
    //             <div 
    //                 className="ant-tabs-nav-list" 
    //                 style={{transform: 'translate(0px, 0px)'}}>
    //                 {
    //                     panes.map(pane => {
    //                         return pane.props.closable != undefined && !pane.props.closable 
    //                         ? 
    //                         <div 
    //                             className={`${props.activeKey == pane.key ? 'ant-tabs-tab-active' : ''} ant-tabs-tab`} 
    //                             key={pane.key}>
    //                             <div 
    //                                 role="tab" 
    //                                 className="ant-tabs-tab-btn">
    //                                     {pane.props.tab}
    //                             </div>
    //                         </div>
    //                         :
    //                         <div 
    //                             key={pane.key}
    //                             className={`${props.activeKey == pane.key ? 'ant-tabs-tab-active' : ''} ant-tabs-tab ant-tabs-tab-with-remove`} 
    //                             style={{marginLeft: '5px'}}>
    //                             <div className="ant-tabs-tab-btn" >
    //                                     {pane.props.tab}
    //                             </div>
    //                             <button type="button" className="ant-tabs-tab-remove" onClick={c=>this.remove(pane.key)}>
    //                                 <span role="img" className="anticon anticon-close">
    //                                     <svg 
    //                                         viewBox="64 64 896 896" 
    //                                         focusable="false" 
    //                                         data-icon="close" 
    //                                         width="1em" 
    //                                         height="1em" 
    //                                         fill="currentColor" 
    //                                         aria-hidden="true">
    //                                         <path 
    //                                             d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
    //                                         </path>
    //                                     </svg>
    //                                 </span>
    //                             </button>
    //                         </div>
    //                     })
    //                 }
    //             </div>
    //         </div>
    //     </div>
            
    // }
    componentDidMount() {
        // 事件监听
        // document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this.handleClick);
        document.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        // 组件卸载移除事件监听
        // document.removeEventListener('contextmenu', this._handleContextMenu);
        document.removeEventListener('click', this.handleClick);
        document.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        const {top, left, show} = this.state
        const {selectedKeys, panes} = this.props
        const activeKey = selectedKeys && selectedKeys.length ? selectedKeys[0] : ''
        return (
            <div className='pr' onContextMenu={this._handleContextMenu}>
                <Tabs
                    hideAdd
                    activeKey={activeKey}
                    type="editable-card"
                    tabBarGutter={5}
                    tabBarStyle={{marginBottom: 0, padding: '5px 10px'}}
                    onChange={this.onChange}
                    onEdit={this.onEdit}
                    // renderTabBar={this.renderTabBar}
                >
                    {panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}></TabPane>
                    ))}
                </Tabs>
                <ul ref={c => this.contextMenu = c} style={{display: show ? 'block' : 'none', left:left+'px',top:top+'px'}} className="contextmenu pa">
                    <li className='ul_li' onClick={this.refreshSelectedTag}><i className="el-icon-refresh-right"></i> 刷新页面</li>
                    <li className='ul_li' style={{display: this.isAffix() ? 'block' : 'none'}} onClick={this.closeSelectedTag}><i className="el-icon-close"></i> 关闭当前</li>
                    <li className='ul_li' onClick={this.closeOthersTags}><i className="el-icon-circle-close"></i> 关闭其他</li>
                    <li className='ul_li' style={{display: this.isFirstView() ? 'block' : 'none'}} onClick={this.closeLeftTags}><i className="el-icon-back"></i> 关闭左侧</li>
                    <li className='ul_li' style={{display: this.isLastView() ? 'block' : 'none'}} onClick={this.closeRightTags}><i className="el-icon-right"></i> 关闭右侧</li>
                    <li className='ul_li' onClick={this.closeAllTags}><i className="el-icon-circle-close"></i> 全部关闭</li>
                </ul>
            </div>
        )
    }
}

export default connect(
    state => ({
        panes: state.tabsView,
        selectedKeys: state.selectedKeys,
    }),
    {
        updateOpenkeys,
        updateSelectedkeys,
        updateBreadcrumb,
        updateTabsView
    }
)(withRouter(TabsView))