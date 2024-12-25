import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, Select, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const ProductDetail = ({ id, onSubmit }) => {

    const handleSubmit = (values) => {
        onSubmit({ ...values, id });
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
        <Form labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        onFinish={handleSubmit}>
            <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <Upload name="image" listType="picture" beforeUpload={() => false} onChange={handleImageChange}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>
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
                label="Variant"
                name="variant"
                rules={[{ required: true, message: 'Please select variants' }]}>
                <Select placeholder="Select variants" mode="multiple">
                    <Option value="hot">Hot</Option>
                    <Option value="cold">Cold</Option>
                    <Option value="iced">Iced</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
            >
                <Input.TextArea name="description" placeholder="(Optional) Enter descriptions" />
            </Form.Item>

            <div className='flex justify-between'>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save Change
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type="text" htmlType="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                    </Button>

                </Form.Item>
            </div>

        </Form>
    );
};

export default ProductDetail;