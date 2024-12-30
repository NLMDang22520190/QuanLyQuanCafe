import React from "react";
import { Form, Input, Button, message, Card } from "antd";
import axios from "axios";

const AddNewUser = ({ onSubmit }) => {
  const handleFinish = async (values) => {
    try {
      const response = await axios.post("https://localhost:7087/api/account/create-user", {
        email: values.email,
        orderId: values.orderId,
      });

      if (response.status === 200) {
        message.success("Account created successfully!");
        onSubmit(values); 
      } else {
        message.error("Failed to create account!");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      message.error("Order id is not exist!");
    }
  };

  return (
    <Card
      title="Add New User"
      bordered={false}
      style={{
        width: 400, 
        margin: "0 auto", 
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
      }}
    >
      <Form layout="vertical" onFinish={handleFinish}>
      
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter email" 
          prefix={<svg width={"0px"} height={"0px"}></svg>}/>
        </Form.Item>
        <Form.Item
          label="Order ID"
          name="orderId"
          rules={[{ required: true, message: "Please enter the order ID!" }]}
        >
          <Input placeholder="Enter order ID" 
          prefix={<svg width={"0px"} height={"0px"}></svg>}/>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Add New User
        </Button>
      </Form>
    </Card>
  );
};

export default AddNewUser;
