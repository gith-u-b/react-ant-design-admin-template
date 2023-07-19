import React, { Component, Suspense } from 'react';
import { Layout, Drawer } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import MyBreadcrumb from '../MyBreadcrumb';
import ViewMenu from '../ViewMentu';
import RouterView from '../../router/RouterView';
import NavBar from '../NavBar';
import TabsView from '../TabsView';
import './index.css'
import logo from '../../assets/images/logo192.png'
import {ShowMenu, ShowBreAdcrumb, ShowTabs, ShowFold} from '../../settings'
const { Header, Sider, Content } = Layout;

class MyView extends Component {
  state = {
    collapsed: false,
    menuTheme: 'dark',
    winInnerWidth: 1920
  };

  toggle = () => {
    let {collapsed} = this.state
    this.setState({
      collapsed: !this.state.collapsed,
    },()=>{
      // if(collapsed){
      //   this.viewMenuRef.initOpenKeys()
      // }
    });
  };
  // 窗口大小监听
  windowResize = (e) => {
    const {collapsed} = this.state
    const w = e && e.target ? e.target.innerWidth : window.innerWidth
    this.setState({winInnerWidth: w})
    if(w < 920){
        if(collapsed) return
        this.setState({collapsed: true})
    }else{
      if(w > 920 && collapsed){
        if(!collapsed) return
        this.setState({collapsed: false})
      }
    }
  }
  // 是否显示折叠按钮
  returnFold = () => {
    const {collapsed} = this.state
    return ShowFold && ShowMenu  ?  React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: this.toggle,
    }) : ''
  }
  // logo
  returnLogo = () => {
    const {collapsed} = this.state
    return <div className="logo flex-row-center-center">
      <img width={32} height={32} src={logo} alt="" />
      { collapsed ?  '' : 'React Antd Template' }
    </div>
  }
  // 是否显示菜单 window.innerWidth>600
  returnMenu = () => {
    const {collapsed} = this.state
    return ShowMenu ? 
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='w100 h100 flex-column'>
          {this.returnLogo()}
          <ViewMenu onRef={c => this.viewMenuRef = c} collapsed={collapsed}/>
        </div>
      </Sider> : ''
  }
  // window.innerWidth<=600
  returnMobileMenu = () => {
    const {collapsed} = this.state
    return <Drawer
            width="200"
            title={this.returnLogo()}
            headerStyle={{
              backgroundColor: '#001529',
              border: 'none',
              padding: 0
            }}
            bodyStyle={{
              padding: 0,
              display: 'flex',
              flexDirection: 'column'
            }}
            placement='left'
            closable={false}
            onClose={this.toggle}
            visible={!collapsed}
            key='left'
            >
              <ViewMenu onRef={c => this.viewMenuRef = c} collapsed={collapsed}/>
          </Drawer>
  }
  // 是否显示面包屑
  returnBreAdcrumb = () => {
    return ShowBreAdcrumb  ? <MyBreadcrumb /> : ''
  }
  // 是否显示菜单
  returnTabs = () => {
    // 是否显示选项卡
    return ShowTabs ? <TabsView /> : ''
  }

  // 组件挂载
  componentDidMount() {
    this.windowResize()
    window.addEventListener('resize', this.windowResize)
  }
  // 组件将要卸载
  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize)
  }
  render() {
    const {routes} = this.props;
    const {winInnerWidth} = this.state
    return (
      <Layout className="w100 h100">
        {
          // 是否显示菜单
          winInnerWidth > 600 ? this.returnMenu() : this.returnMobileMenu()
        }
        <Layout className="site-layout">
            <Header className="site-layout-background flex-row-between-center" style={{ padding: 0 }}>
                <div className="flex-row-start-center">
                  {
                    // 是否显示折叠按钮
                    this.returnFold()
                  }
                  {
                    // 是否显示面包屑
                    this.returnBreAdcrumb()
                  }
                </div>
                {/* 用户信息 退出登录等操作 */}
                <NavBar />
            </Header>

            {
              // 是否显示选项卡
              this.returnTabs()
            }
            <Content
                className="site-layout-background"
                style={{padding: 24, minHeight: 280, overflow: 'auto'}}
            >
              <RouterView routes={routes}/>
            </Content>
        </Layout>
      </Layout>
    );
  }
}
export default MyView