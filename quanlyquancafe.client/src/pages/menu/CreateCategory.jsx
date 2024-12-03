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
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea placeholder="Enter description" rows={4} maxLength={6}/>
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
