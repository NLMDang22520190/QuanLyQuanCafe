import React, { useState, useEffect } from "react";
import { Modal,InputNumber, Input, Button, Select, DatePicker, Form, Row, Col, Typography, message } from "antd";
import instance from "../../features/AxiosInstance/AxiosInstance";
import moment from "moment";

const { Title } = Typography;

const IngredientDetail = ({ visible, onClose, ingredientId }) => {
  useEffect(() => {
    console.log("Ingredient ID:", ingredientId);
  }, [ingredientId]);
  const [form] = Form.useForm();
  const [ingredient, setIngredient] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
   const currentDateTime = moment().format("YYYY-MM-DD");

  useEffect(() => {
    if (ingredientId) {
      const fetchIngredient = async () => {
        try {
          const response = await instance.get(`/api/ingredient/${ingredientId}`);
          console.log("Phản hồi từ API:", response.data);
          const data = response.data;

          setIngredient(data);
          form.setFieldsValue({
            materialName: data.ingredientName,
            unit: data.unit,
            price: data.importPrice,
            quantity: data.quantity,
            dateImport:  moment(data.dateImport || currentDateTime, "YYYY-MM-DD")
          });
        } catch (error) {
          console.error("Error fetching ingredient:", error);
          message.error("Không thể tải thông tin nguyên liệu.");
        }
      };

      fetchIngredient();
    }
  }, [ingredientId, visible, form]);

  useEffect(() => {
    if (ingredient && ingredient.quantity && ingredient.importPrice) {
      setTotalPrice(ingredient.quantity * ingredient.importPrice);
    }
  }, [ingredient]);

  const handleSave = async (values) => {
    const quantity = Number(values.quantity);


    if (quantity <= 0) {
      message.error("Vui lòng nhập số lượng hợp lệ.");
      return;
    }

    const updatedIngredient = {
      newRecord: {
        ingredientId: ingredientId,
        dateImport: currentDateTime,
        quantityImport: quantity, 
        importPrice: quantity * ingredient.importPrice,
      },
      ingredientName: ingredient.ingredientName, 
    unit: ingredient.unit, 
    };


    try {
      const response = await instance.post(`/api/import-record`, updatedIngredient);
  
      if (response.status === 200 || response.status === 201) {
        message.success("Nhập nguyên liệu thành công!");
        onClose(); 
      } else {
        throw new Error("Phản hồi không hợp lệ từ API");
      }
    } catch (error) {
      console.error("Lỗi khi nhập nguyên liệu:", error);
      message.error("Không thể nhập nguyên liệu. Vui lòng thử lại.");
    }
  };

  const handleFormChange = (_, allValues) => {
    const quantity = allValues.quantity || 0;
    const price = ingredient?.importPrice || 0;
    setTotalPrice(quantity * price);
  };

  if (!ingredient) {
    return (
      <Modal
        title="Chi tiết nguyên liệu"
        visible={visible}
        onCancel={onClose}
        footer={null}
        width={700}
      >
        <p>Không có dữ liệu nguyên liệu để hiển thị.</p>
      </Modal>
    );
  }

  return (
    <Modal
      title="Chi tiết nguyên liệu"
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
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Tên nguyên liệu">
              <Input value={ingredient.ingredientName || "Không xác định"} readOnly 
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
                value={form.getFieldValue("dateImport")}
                disabled
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Đơn vị tính">
              <Select value={ingredient.unit || "Không xác định"} disabled>
                <Select.Option value="kg">Kilogram</Select.Option>
                <Select.Option value="pcs">Piece</Select.Option>
                <Select.Option value="ltr">Liter</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Giá nhập">
              <Input
                value={(ingredient.importPrice || 0).toLocaleString("vi-VN", {
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

          <Col xs={24} md={12}>
            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng." },
                { type: "number", min: 1, message: "Số lượng phải lớn hơn 0." },
              ]}
            >
              <InputNumber min={1} placeholder="Nhập số lượng" style={{ width: "100%" }} />
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

export default IngredientDetail;
