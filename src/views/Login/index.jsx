import React from 'react';
import { Button, Input } from 'antd'
import {removeToken} from '@/utils/auth'
import { setToken, setUser } from '../../utils/auth.js'
import './index.css'
class Login extends React.Component{
	state = {
        tipsMsg: '',
        loginBtnLoad: false,
        userName: '',
        passWord: '',
	}
    // 用户名 密码赋值
    handleChange = ({target: {value}}, key) => {
        this.setState({[key]: value})
    }
    // 登陆
    handleLogin = () => {
        this.props.history.push('/')
        setToken('token')
        return
    }
    // 验证
    validationRule = () =>{
        let {userName, passWord} = this.state
        if (userName == '') {
            this.setState({tipsMsg: '登录账号不能为空'})
            return false
        }
        if (passWord == '') {
            this.setState({tipsMsg: '登录密码不能为空'})
            return false
        }
        return true
    }
    componentDidMount() {
        // 默认打开登录页，清除缓存
        removeToken()
    }
	render(){
        let {tipsMsg, loginBtnLoad} = this.state
		return (
			<div className="login-container w100 h100 flex-row" style={{'justifyContent': 'center'}}>
                <div className="flex-column" style={{'justifyContent': 'center'}}>
                    <div className="flex-column login-content">
                        <div className="con-item">
                            <div className="flex-column">
                                <div className="form-label">用户名:</div>
                                <Input ref="userName" onChange={(value)=>{this.handleChange(value, 'userName')}} placeholder="请输入登录账号" size="large"></Input>
                            </div>
                            <div className="flex-column mT25">
                                <div className="form-label">密码:</div>
                                <Input onChange={(value)=>{this.handleChange(value, 'passWord')}} type="password" placeholder="请输入密码" size="large"></Input>
                            </div>
                            <div className="flex-row-center-center error-msg">{tipsMsg}</div>
                            <Button className="w100" type="primary" onClick={this.handleLogin} size="large" loading={loginBtnLoad}>登录</Button>
                        </div>
                    </div>
                </div>
            </div>
		)
	};
}

export default Login;
