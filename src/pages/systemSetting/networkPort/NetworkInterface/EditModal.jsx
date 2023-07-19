import React, { Component } from 'react';
import MyModal from '@/compontens/MyModal';
import EditForm from './EditForm';
class EditModal extends Component {
    // 点击弹框确定进行表单验证/提交
    // submitClick = (type) => {
    //     if(type) this.EditForm.submitClick()
    //     if(!type) this.visibleModal(false)
    // }

    // 表单验证/提交回调
    submitFunc = (type, value) => {
        // true验证通过 false验证未通过
        if(type) this.props.saveUpdate(value)
    }
    // 父调用此方法 显示弹框
    // visibleModal = (type) => {
    //     if(!type) this.EditForm.onResize()
    //     this.modalRef.visibleModal(type)
    // }
    render() {
        const { form } = this.props
        return (
            <MyModal ref={el => this.modalRef = el} title={'物理接口'}>
                <EditForm ref={el => this.EditForm = el} form={form} submitFunc={this.submitFunc}/>
            </MyModal>
        );
    }
}

export default EditModal;