import React, {Component} from "react";
import {Route, Redirect} from 'react-router-dom'
import {getToken} from '@/utils/auth'
import {initSelectedKeys} from '@/utils/menu'

export default class RouterGuard extends Component{
    state = {
        whiteList: ['/login'], //白名单
        isRedirectIndex: false, // 登录状态下访问登录，重定向到首页
        isShowFirst: false, // 默认打开主页
        isRedirectLogin: false, // 默认重定向到登录页
        isShowRoute: false, // 路由跳转
    }
    undateStatus = () => {
        let {whiteList} = this.state
        let isRedirectIndex = false,
            isShowFirst = false,
            isRedirectLogin = false,
            isShowRoute = false
        let {redirect, path, location, routes} = this.props
        let token = getToken() // 是否含有token，有则是登录状态，反之重定向到登录页
        if(token){
            if(redirect){
                // 登录状态下访问登录，重定向到首页
                isRedirectIndex = true
            }else{
                if(location.pathname == '/'){
                    // 默认打开主页
                    isShowFirst = true
                }else{
                    isShowRoute = true
                }
            }
        }else{
            if (whiteList.indexOf(path) !== -1) {
                // 在免登录白名单，直接进入
                isShowRoute = true
            } else {
                // 默认重定向到登录页
                isRedirectLogin = true
            }
        }
        this.setState({
            isRedirectIndex,
            isShowFirst,
            isRedirectLogin,
            isShowRoute,
        })
    }
    componentDidMount() {
        this.undateStatus()
    }
    componentDidUpdate(prevProps,prevState){
        let {location: {pathname}, path} = this.props
        let {isRedirectIndex, isShowFirst, isRedirectLogin, isShowRoute} = this.state
        // 重定向情况下，更新打开状态
        if(isRedirectIndex || isShowFirst){
            this.undateStatus()
        }
        // 路由发生变化，发布消息
        if(isShowRoute){
            React.$PubSub.publish('routeChange', pathname)
        }
    }
    render() {
        let {isRedirectIndex, isShowFirst, isRedirectLogin, isShowRoute} = this.state
        let {routes, component: RouteComponents} = this.props
        if(isRedirectIndex){
            // 登录状态下访问登录，重定向到首页
            return <Redirect to="/"/>;
        }
        if(isShowFirst){
            // 默认打开主页
            return <Redirect to={initSelectedKeys[initSelectedKeys.length - 1]}/>;
        }
        if(isRedirectLogin){
            // 默认重定向到登录页
            return <Redirect to="/login"/>;
        }
        if(isShowRoute){
            return <RouteComponents {...this.props} />
        }
        return <></>
    }
    // render() {
    //     let {whiteList} = this.state
    //     let {redirect, path, location, component: RouteComponents, routes} = this.props
    //     let token = getToken() // 是否含有token，有则是登录状态，反之重定向到登录页
    //     if(token){
    //         if(redirect){
    //             // 登录状态下访问登录，重定向到首页
    //             return <Redirect to="/"/>;
    //         }else{
    //             if(location.pathname == '/'){
    //                 // 默认打开主页
    //                 return <Redirect to={routes[0].path}/>;
    //             }else{
    //                 return <RouteComponents {...this.props} />
    //             }
    //         }
    //     }else{
    //         if (whiteList.indexOf(path) !== -1) {
    //             // 在免登录白名单，直接进入
    //             return <RouteComponents {...this.props} />
    //         } else {
    //             // 默认重定向到登录页
    //             return <Redirect to="/login"/>;
    //         }
    //     }
    // }
}