import React, {Suspense, Component} from "react";
import {Switch, Redirect, Route} from 'react-router-dom'
import RouterGuard from "../RouterGuard";
import MyLoading from "@/compontens/MyLoading";


import {getConfirmation} from '@/axios'

export default class RouterView extends Component{
    render(){
        let { routes } = this.props // 拿到index.jsx页面传过来的 路由列表
        return (
            <Suspense fallback={<MyLoading/>}> 
                <Switch>
                    {
                        routes.map((item, index) => {
                            return <Route key={index} path={item.path} exact={item.exact} render={(props) => {
                                    // 路由跳转取消上个组件所有的pending请求
                                    getConfirmation()
                                    return <RouterGuard {...item} {...props} />
                                }}></Route> 
                        })
                    }
                </Switch>
            </Suspense>
        )
    }
}