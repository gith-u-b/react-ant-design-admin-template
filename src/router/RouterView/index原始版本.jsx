import React, {Suspense, Component} from "react";
import {Switch, Redirect, Route} from 'react-router-dom'

import {getConfirmation} from '@/axios'

export default class RouterView extends Component{
    render(){
        let { routes } = this.props // 拿到index.jsx页面传过来的 路由列表
        return (
            <Suspense fallback={<div>Loading...</div>}> 
                <Switch>
                    {
                        routes.map((item, index) => {
                            return item.component 
                                ? 
                                <Route key={index} path={item.path} exact={item.exact} render={(props) => {
                                    // 路由跳转取消上个组件所有的pending请求
                                    getConfirmation()
                                    return <item.component routes={item.routes} {...props} />
                                }}></Route> 
                                : 
                                <Redirect key={index} from={item.path} to={item.redirect} /> // 找不到对应的路由时 全部去到404页面
                        })
                    }
                </Switch>
            </Suspense>
        )
    }
}