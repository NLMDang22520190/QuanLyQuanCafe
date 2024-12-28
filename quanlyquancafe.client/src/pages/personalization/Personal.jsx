import React, { useState } from "react";
import { Form, Input, Button, message, Card, Upload, DatePicker, Radio, Row, Col } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import './personal.css'
const Personal = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);

  const handleFinish = (values) => {
    message.success("Information updated successfully!");
    console.log("Updated values:", values);
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      setAvatar(URL.createObjectURL(info.file.originFileObj));
      message.success(`${info.file.name} uploaded successfully.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  return (
    <Card style={{color:'#ffc107'}} title="Personal Information" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          gender: "male",
        }}
      >
        <Row gutter={16}>
          {/* Avatar Upload */}
          <Col span={8}>
            <Form.Item label="Avatar">
              <Upload
                listType="picture-circle"
                showUploadList={false}
                onChange={handleAvatarChange}
                accept="image/*"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    style={{ width: "100%", borderRadius: "50%" }}
                  />
                ) : (
                  <div>
                    <UserOutlined style={{ fontSize: 24 }} />
                    <div>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>

          {/* Name */}
          <Col span={8}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input placeholder="Enter your name" 
              prefix={<svg width={"0px"} height={"0px"}></svg>}/>
            </Form.Item>
          </Col>

          {/* Email */}
          <Col span={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email address!" },
              ]}
            >
              <Input placeholder="Enter your email" 
              prefix={<svg width={"0px"} height={"0px"}></svg>}/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Phone */}
          <Col span={8}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                { pattern: /^[0-9]+$/, message: "Phone number must be numeric!" },
              ]}
            >
              <Input placeholder="Enter your phone number"
              prefix={<svg width={"0px"} height={"0px"}></svg>} />
            </Form.Item>
          </Col>

          {/* Date of Birth */}
          <Col span={8}>
            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[{ required: true, message: "Please select your date of birth!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Gender */}
          <Col span={8}>
            <Form.Item name="gender" label="Gender">
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        {/* Save Button */}
        <Row justify="center">
          <Col span={6}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save Changes
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Personal;
