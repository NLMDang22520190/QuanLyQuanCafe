import React, { useState } from 'react';
import { Modal, Input, Button, Card, Form } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const CreateCategory = ({ onSubmit, onClose}) => {

    const handleFinish = (values) => {
        createCategory(values);
        onSubmit();
        message.success("Category created successfully!");
    }

    const createCategory = async (foodType) => {
      axios.post("https://localhost:7087/api/food-types", foodType)
  .then(response => {
      console.log(response);
  })
  .catch(error => {
      console.error('There was an error!', error);
  });
  }

    return (
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Name"
            name="typeOfFoodName"
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                       </svg>} name='typeOfFoodName' placeholder='Enter category title' />
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
