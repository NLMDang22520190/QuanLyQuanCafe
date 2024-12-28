import React from "react";
import { Form, Input, Button, Card, message } from "antd";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    message.success("Password changed successfully!");
    console.log("Password change data:", values);
  };

  return (
    <Card className="mt-8" title="Change Password" bordered={false}>
      <Form
        form={form}
        layout="inline"
        onFinish={handleFinish}
      >
        {/* Current Password */}
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[{ required: true, message: "Please enter your current password!" }]}
        >
          <Input.Password placeholder="Enter your current password" />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: "Please enter your new password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password placeholder="Enter your new password" />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your new password" />
        </Form.Item>

        {/* Save Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePassword;
