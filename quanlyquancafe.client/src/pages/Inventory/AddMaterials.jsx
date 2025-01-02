import React, { useState } from "react";
import { Modal, Input, Button, Select, DatePicker, Form, Row, Col, Typography, message } from "antd";
import instance from "../../features/AxiosInstance/AxiosInstance";
import moment from "moment";

const { Title } = Typography;

const AddMaterials = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  const currentDateTime = moment().format("YYYY-MM-DD");

  const handleSave = async (values) => {
    const { materialName, unit, quantity, price } = values;
  
    if (!materialName || !unit || quantity <= 0 || price <= 0) {
      message.error("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }
  
    try {
 
      const checkResponse = await instance.get(`/api/ingredient/check-exists?name=${encodeURIComponent(materialName)}`);
  
      if (checkResponse.data.exists) {
      
        message.error("Nguyên liệu đã tồn tại");
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
  
      const response = await instance.post(`/api/import-record`, newMaterial);
  
      if (response.status === 201) {
        message.success("Nhập nguyên liệu thành công!");
        onClose(); 
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra hoặc lưu nguyên liệu:", error.response?.data || error.message);
      message.error(error.response?.data?.error || "Không thể thực hiện thao tác. Vui lòng thử lại.");
    }
  };
  

  const handleFormChange = (_, allValues) => {
    const { price, quantity } = allValues;
    const total = (price || 0) * (quantity || 0);
    setTotalPrice(total);
  };

  return (
    <Modal
      title="Nhập nguyên liệu"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Form
        form={form}
        layout="horizontal"
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
              <Input placeholder="Tên mặt hàng" 
                    prefix={
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="gray"
                          className="size-6"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                          />
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 6h.008v.008H6V6Z"
                          />
                      </svg>
                  }/>
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
              <Select 
              placeholder="--Chọn đơn vị--"
              prefix={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="gray"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                    />
                </svg>
            }>
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
                prefix={
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="size-6"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                      />
                  </svg>
              }
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
                prefix={
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="size-6"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                      />
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6h.008v.008H6V6Z"
                      />
                  </svg>
              }
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
                prefix={
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="size-6"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                      />
                  </svg>
              }
                readOnly
              />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: "8px" }}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu lại
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddMaterials;
