import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
// const [form] = Form.useForm();
export default class BasicForm extends Component {
    onGenderChange = (value) => {
      switch (value) {
        case 'male':
          this.form.setFieldsValue({
            note: 'Hi, man!',
          });
          return;
  
        case 'female':
            this.form.setFieldsValue({
            note: 'Hi, lady!',
          });
          return;
  
        case 'other':
            this.form.setFieldsValue({
            note: 'Hi there!',
          });
      }
    }
    onFinish = (values) => {
      console.log(values);
    }
    onReset = () => {
        this.form.resetFields();
    }
    onFill = () => {
        this.form.setFieldsValue({
        note: 'Hello world!',
        gender: 'male',
      });
    }
    render() {
        return (
            <Form {...layout} ref={c=>this.form = c} name="control-hooks" onFinish={this.onFinish}>
                <Form.Item
                    name="note"
                    label="Note"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        onChange={this.onGenderChange}
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {({ getFieldValue }) =>
                    getFieldValue('gender') === 'other' ? (
                        <Form.Item
                            name="customizeGender"
                            label="Customize Gender"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                        <Input />
                        </Form.Item>
                    ) : null
                    }
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={this.onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" onClick={this.onFill}>
                        Fill form
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
