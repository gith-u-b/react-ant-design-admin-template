import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import MyModal from '@/compontens/MyModal';
class MyForm extends Component {
    formRef = React.createRef()
    modalRef = React.createRef()
    state = {
        // form: {}
    }
    onFinish = (values) => {
        // console.log('Success:', values);
        // 关闭回调
        this.modalRef.current.closeModal()
    }
    onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
        console.log(this.modalRef)
    }
    // 字段更新时触发回调事件
    onFieldsChange = (changedFields, allFields) => {
        console.log(changedFields)
    }
    // 字段值更新时触发回调事件
    onValuesChange = (changedValues, allValues) => {
        // const {form} = this.state
        // let obj = Object.assign({}, form, changedValues);
        // this.setState({form: obj})
    }
    submitClick = (e) => {
        this.formRef.current.submit()
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>
                <MyModal ref={this.modalRef} title={'这是弹框标题'} handleFunc={this.submitClick}>
                    <Form
                        ref={this.formRef}
                        name="basic"
                        labelCol = {{
                            span: 4,
                        }}
                        wrapperCol = {{
                            span: 20,
                        }}
                        initialValues = {{
                            remember: true,
                        }}
                        onFinish = {this.onFinish}
                        onFinishFailed = {this.onFinishFailed}
                        // onFieldsChange= {this.onFieldsChange}
                        onValuesChange = {this.onValuesChange}
                        >
                        <Form.Item label="用户名" name="username" rules={[
                            { required: true, message: '请输入用户名', },
                        ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="密码" name="password" rules={[
                            { required: true, message: 'Please input your password!', },
                        ]}>
                            <Input.Password />
                        </Form.Item>
                    </Form>
                </MyModal>
            </div>
        );
    }
}

export default MyForm;