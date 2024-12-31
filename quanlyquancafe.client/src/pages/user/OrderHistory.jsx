import React, { useState, useEffect } from "react";
import { Modal, Collapse, Table, Spin, message } from "antd";
import instance from "../../features/AxiosInstance/AxiosInstance"; 
import axios from "axios";

const { Panel } = Collapse;

const OrderHistory = ({ visible, onCancel, userId }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await instance.get(`/api/order-details/order/${orderId}`);
      console.log(`Order Details for ${orderId}:`, response.data);
  
      const detailsWithItemNames = await Promise.all(
        response.data.map(async (detail) => {
          try {
            const itemResponse = await instance.get(`/api/menu-items/${detail.itemId}`);
            const itemData = itemResponse.data;

            const totalPrice = itemData.price * detail.quantity;
  
            return {
              product: itemData.itemName || "Unknown Item", 
              quantity: detail.quantity || 0, 
              price: `$${totalPrice.toFixed(2)}`,
            };
          } catch (itemError) {
            console.error(`Error fetching item for ItemId ${detail.itemId}:`, itemError);

            return {
              product: detail.productName || "Unknown Product",
              quantity: detail.quantity || 0,
              price: "N/A", 
            };
          }
        })
      );
  
      return detailsWithItemNames;
    } catch (error) {
      console.error(`Error fetching details for order ${orderId}:`, error);
      return [];
    }
  };
  
  

  const fetchOrders = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await instance.get(`/api/orders/user/${userId}`);
      console.log("Orders Data:", response.data);
      const orders = await Promise.all(
        Array.isArray(response.data)
          ? response.data.map(async (order) => {
              const details = await fetchOrderDetails(order.orderId);

              // Chuyển `order.orderTime` thành định dạng yyyy-MM-dd
            const formattedDate = order.orderTime
            ? new Date(order.orderTime).toISOString().split("T")[0]
            : "Unknown Date";

              return {
                orderId: order.orderId || "Unknown Order",
                date: formattedDate,
                total: order.totalPrice !== undefined ? `$${order.totalPrice.toFixed(2)}` : "N/A",
                address: order.deliveryAddress || "Unknown Address",
                phone: order.phoneNumber || "Unknown Phone",
                status: order.orderState || "Unknown Status",
                details,
              };
            })
          : []
      );
      setOrderHistory(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Failed to load order history.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (visible && userId) {
      fetchOrders();
    }
  }, [visible, userId]);

  return (
    <Modal
      title="Order History"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      {loading ? (
        <Spin tip="Loading Order History..." />
      ) : (
        <Collapse accordion>
          {orderHistory.map((order) => (
            <Panel
              header={`Order ID: ${order.orderId} | Date: ${order.date} | Total: ${order.total}`}
              key={order.orderId}
            >
              <div style={{ marginBottom: "16px" }}>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </div>
              <Table
                columns={[
                  { title: "Product", dataIndex: "product", key: "product" },
                  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                  { title: "Price", dataIndex: "price", key: "price" },
                ]}
                dataSource={order.details}
                rowKey="product"
                pagination={false}
                bordered
              />
            </Panel>
          ))}
        </Collapse>
      )}
    </Modal>
  );
};

export default OrderHistory;





