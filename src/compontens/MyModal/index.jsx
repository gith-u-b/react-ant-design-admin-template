import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';
import PubSub from 'pubsub-js';

class MyModal extends Component {
    state = {
        visible: false,
        disabled: true,
        bounds: { left: 0, top: 0, bottom: 0, right: 0 },
    }

    draggleRef = React.createRef();

    visibleModal = (type) => {
        this.setState({
            visible: type,
        });
    }
    handleOk = e => {
        // this.props.handleFunc(true) // 确定回调

        // 发布消息-弹框确定回调
        PubSub.publish('handleModal', true)
    }

    handleCancel = e => {
        // closeFlag：是否有关闭前的回调
        // this.props.handleFunc(false)

        // 发布消息-弹框关闭回调
        PubSub.publish('handleModal', false)
        this.visibleModal(false)
    }

    onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = this.draggleRef?.current?.getBoundingClientRect();
        this.setState({
            bounds: {
            left: -targetRect?.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y),
            },
        });
    }
    componentDidMount() {
        // 订阅消息-弹框是否打开/取消
        PubSub.subscribe('manualModal', (_, type) => {
            if(!type){
                this.handleCancel()
                return
            }
            this.visibleModal(type)
        })
    }
    componentWillUnmount() {
        PubSub.unsubscribe('manualModal')
    }
    render() {
        const { bounds, disabled, visible } = this.state;
        const { title, children, width } = this.props
        return (
            <div>
                <Modal
                    title={
                        <div
                            style={{
                                width: '100%',
                                cursor: 'move',
                            }}
                            onMouseOver={() => {
                                if (disabled) {
                                    this.setState({
                                        disabled: false,
                                    });
                                }
                            }}
                            onMouseOut={() => {
                                this.setState({
                                    disabled: true,
                                });
                            }}
                            onFocus={() => {}}
                            onBlur={() => {}}
                            >
                            {title}
                        </div>
                    }
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    modalRender={modal => (
                        <Draggable
                            disabled={disabled}
                            bounds={bounds}
                            onStart={(event, uiData) => this.onStart(event, uiData)}
                        >
                            <div ref={this.draggleRef}>{modal}</div>
                        </Draggable>
                    )}
                    width={width || '60%'}
                    >
                        {children}
                </Modal>
            </div>
        );
    }
}

export default MyModal;