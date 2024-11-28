import React from "react";
import { Form, Input, Button, message, Card } from "antd";

const AddNewUser = ({ onSubmit }) => {
  const handleFinish = (values) => {
    onSubmit(values);
    message.success("Account created successfully!");
  };

  return (
    <Card
      title="Add New User"
      bordered={false}
      style={{
        width: 400, // Đặt chiều rộng cho card
        margin: "0 auto", // Căn giữa card
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Tạo hiệu ứng bóng cho đẹp
      }}
    >
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name!" }]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Order ID"
          name="orderId"
          rules={[{ required: true, message: "Please enter the order ID!" }]}
        >
          <Input placeholder="Enter order ID" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Add New User
        </Button>
      </Form>
    </Card>
  );
};

export default AddNewUser;
