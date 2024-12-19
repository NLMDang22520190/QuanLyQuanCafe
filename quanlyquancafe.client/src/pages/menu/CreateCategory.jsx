import React, { useState } from 'react';
import { Modal, Input, Button, Card, Form } from 'antd';

const { TextArea } = Input;
const CreateCategory = ({ onSubmit, onClose}) => {

    const handelFinish = (values) => {
        onSubmit(values);
        message.success("Category created successfully!");
    }

    return (
        <Form layout="vertical" onFinish={handelFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                       </svg>} name='name' placeholder='Enter category title' />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea placeholder="Enter category description" rows={4} maxLength={6}/>
          </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                Save
                </Button>
                <Button onClick={onClose} style={{ marginLeft: 10 }}>
                Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateCategory;
