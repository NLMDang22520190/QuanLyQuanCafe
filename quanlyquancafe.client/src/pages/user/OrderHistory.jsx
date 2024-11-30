import React from "react";
import { Modal, Collapse, Table ,Spin} from "antd";
import { useState } from "react";

const { Panel } = Collapse;

const OrderHistory = ({ visible, onCancel, userId  }) => {
    const [orderHistory, setOrderHistory] = useState([
        {
          orderId: "ORD001",
          date: "2024-11-01",
          total: "$150",
          address: "123 Main St, Springfield",
          phone: "123-456-7890",
          status: "Delivered",
          details: [
            { product: "Espresso", quantity: 2, price: "$10" },
            { product: "Cappuccino", quantity: 1, price: "$20" },
          ],
        },
        {
          orderId: "ORD002",
          date: "2024-11-15",
          total: "$90",
          address: "456 Elm St, Shelbyville",
          phone: "987-654-3210",
          status: "Pending",
          details: [
            { product: "Latte", quantity: 1, price: "$30" },
            { product: "Mocha", quantity: 3, price: "$60" },
          ],
        },
        {
          orderId: "ORD003",
          date: "2024-11-20",
          total: "$50",
          address: "789 Oak St, Ogdenville",
          phone: "555-123-4567",
          status: "Cancelled",
          details: [
            { product: "Americano", quantity: 1, price: "$10" },
            { product: "Croissant", quantity: 2, price: "$20" },
          ],
        },
      ]);
      
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     if (userId && visible) {
    //       fetchOrderHistory(userId);
    //     }
    //   }, [userId, visible]);
    //   const fetchOrderHistory = async (userId) => {
    //     setLoading(true);
    //     try {
    //       const response = await fetch(`/api/orders?user_id=${userId}`);
    //       const data = await response.json();
    //       setOrderHistory(data.orders); 
    //     } catch (error) {
    //       console.error("Failed to fetch order history:", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
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
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Status:</strong> {order.status}</p>
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
