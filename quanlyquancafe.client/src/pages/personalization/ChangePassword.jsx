import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import api from "../../features/AxiosInstance/AxiosInstance";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async (values) => {
    // message.success("Password changed successfully!");
    // console.log("Password change data:", values);

    const currentPassword = form.getFieldValue("currentPassword");
    const newPassword = form.getFieldValue("newPassword");
    const confirmPassword = form.getFieldValue("confirmPassword");
    const email = localStorage.getItem("email");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      message.error(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      return;
    }

    setIsLoading(true);

    try {
      console.log({
        email: email,
        password: currentPassword,
      });

      // Kiểm tra mật khẩu hiện tại
      const checkPasswordResponse = await api.post(
        "api/account/CheckUserCurrentPass",
        {
          email: email,
          password: currentPassword,
        }
      );

      console.log(checkPasswordResponse);

      if (checkPasswordResponse.status !== 200) {
        message.error("Mật khẩu hiện tại không đúng.");
        setIsLoading(false);
        return;
      }

      console.log({
        email: email,
        Newpassword: newPassword,
      });

      // Nếu mật khẩu hiện tại đúng, tiếp tục đổi mật khẩu
      const response = await api.post("api/account/changepassword", {
        email: email,
        newPassword: newPassword,
      });

      console.log(response.data);

      if (response.status === 200) {
        message.success("Đổi mật khẩu thành công!");
        // Điều hướng tới trang khác nếu cần
      } else {
        message.error(
          response.data.message || "Đổi mật khẩu thất bại. Vui lòng thử lại."
        );
      }
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error(
          "Có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng thử lại."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8" title="Change Password" bordered={false}>
      <Form form={form} layout="inline" onFinish={handleFinish}>
        {/* Current Password */}
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            { required: true, message: "Please enter your current password!" },
          ]}
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
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your new password" />
        </Form.Item>

        {/* Save Button */}
        <Form.Item>
          <Button disabled={isLoading} type="primary" htmlType="submit" block>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePassword;
