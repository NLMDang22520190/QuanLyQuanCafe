import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker, Form, Row, Col, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const { Title, Text } = Typography;

export const AddMaterials = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [currentDateTime, setCurrentDateTime] = useState(moment().format("YYYY-MM-DD")); 
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSave = async (values) => {
    const { materialName, unit, quantity, price } = values;

    if (!materialName || !unit || quantity <= 0 || price <= 0) {
      message.error("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    const newMaterial = {
      newRecord: {
        ingredientId: 0,
        dateImport: currentDateTime,
        quantityImport: quantity,
        importPrice: price,
      },
      ingredientName: materialName,
      unit: unit,
    };

    try {
      const response = await axios.post("https://localhost:7087/api/import-record", newMaterial);

      if (response.status === 201) {
        message.success("Nhập nguyên liệu thành công!");
        navigate("/inventory");
      }
    } catch (error) {
      console.error("Lỗi khi lưu nguyên liệu:", error.response?.data || error.message);
      message.error(error.response?.data?.error || "Không thể lưu nguyên liệu. Vui lòng thử lại.");
    }
  };

  const handleFormChange = (_, allValues) => {
    const { price, quantity } = allValues;
    const total = (price || 0) * (quantity || 0);
    setTotalPrice(total);
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#1f2937", minHeight: "100vh", color: "#fff" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "128px",
                height: "128px",
                margin: "0 auto",
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#fff",
                border: "4px solid #fadb14",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                alt="Default Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <Text strong style={{ color: "#fadb14", fontSize: "16px" }}>
              Admin
            </Text>
          </div>
        </Col>

        <Col xs={24} md={16}>
          <div style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "8px" }}>
            <Title level={4} style={{ color: "#fadb14" }}>
              Nhập nguyên liệu
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              onValuesChange={handleFormChange}
              initialValues={{
                materialName: "",
                unit: "",
                quantity: 0,
                price: 0,
                dateImport: moment(currentDateTime, "YYYY-MM-DD"),
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Tên mặt hàng (*)"
                    name="materialName"
                    rules={[{ required: true, message: "Vui lòng nhập tên mặt hàng." }]}
                  >
                    <Input placeholder="Tên mặt hàng" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Ngày nhập" name="dateImport">
                    <DatePicker
                      style={{ width: "100%" }}
                      format="YYYY-MM-DD"
                      disabled
                      value={moment(currentDateTime, "YYYY-MM-DD")}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Đơn vị tính (*)"
                    name="unit"
                    rules={[{ required: true, message: "Vui lòng chọn đơn vị tính." }]}
                  >
                    <Select placeholder="--Chọn đơn vị--">
                      <Select.Option value="kg">Kilogram</Select.Option>
                      <Select.Option value="pcs">Piece</Select.Option>
                      <Select.Option value="ltr">Liter</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Giá (*)"
                    name="price"
                    rules={[{ required: true, message: "Vui lòng nhập giá." }]}
                  >
                    <Input
                      type="number"
                      placeholder="Nhập giá"
                      min={0}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Số lượng (*)"
                    name="quantity"
                    rules={[{ required: true, message: "Vui lòng nhập số lượng." }]}
                  >
                    <Input
                      type="number"
                      placeholder="Nhập số lượng"
                      min={0}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Thành tiền">
                    <Input
                      value={totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                      readOnly
                    />
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                <Button onClick={() => navigate("/inventory")} style={{ backgroundColor: "#374151", color: "#fff" }}>
                  Quay lại
                </Button>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#fadb14", borderColor: "#fadb14" }}>
                  Lưu lại
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
