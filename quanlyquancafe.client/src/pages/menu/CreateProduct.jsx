import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const CreateProduct = ({ onSubmit }) => {

    const handleSubmit = (values) => {
        onSubmit(values);
    };

    const handleChange = (e) => {

    }

    const handleImageChange = (info) => {
        console.log(info.file);
    }

    const categories = [
        { id: 1, name: 'Beverages' },
        { id: 2, name: 'Snacks' },
        { id: 3, name: 'Desserts' },
    ];

    return (
        <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: 'Please enter product name!' }]}
            >
                <Input name="name" placeholder="Enter product name" prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
                } onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please enter product price!' }]}
            >
                <InputNumber name="price" placeholder="Enter product price" style={{ width: '50%' }} prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                } onChange={(value) => handleChange({ target: { name: 'price', value } })} />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
            >
                <Input.TextArea name="description" placeholder="(Optional) Enter descriptions" />
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please select a category!' }]}
            >
                <Select placeholder="Select a category" prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                </svg>
                }>
                    {categories.map(category => (
                        <Option key={category.id} value={category.name}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <Upload name="image" listType="picture" beforeUpload={() => false} onChange={handleImageChange}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Create Product
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateProduct;