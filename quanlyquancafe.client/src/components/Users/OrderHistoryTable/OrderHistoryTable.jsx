import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard,
  Eye,
  Wallet,
  Receipt,
} from "lucide-react";
import OrderDetailModal from "../OrderDetailModal/OrderDetailModal";
import { Button, Table, Card } from "flowbite-react";
import { useSelector } from "react-redux";
import api from "../../../features/AxiosInstance/AxiosInstance";

// Mock data for demonstration
const orders = [
  {
    id: "ORD-2024-001",
    status: "completed",
    total: 299.99,
    date: "2024-03-15",
    promoCode: "SPRING20",
    paymentMethod: "credit_card",
    products: [
      { name: "Premium Headphones", quantity: 1 },
      { name: "Wireless Charger", quantity: 2 },
    ],
    notes: "Please handle with care",
  },
  {
    id: "ORD-2024-002",
    status: "pending",
    total: 149.99,
    date: "2024-03-14",
    promoCode: null,
    paymentMethod: "wallet",
    products: [{ name: "Smart Watch", quantity: 1 }],
    notes: "Gift wrapping requested",
  },
  {
    id: "ORD-2024-003",
    status: "cancelled",
    total: 499.99,
    date: "2024-03-13",
    promoCode: "SAVE10",
    paymentMethod: "credit_card",
    products: [
      { name: "Laptop Stand", quantity: 1, notes: "Black color" },
      { name: "Wireless Mouse", quantity: 1 },
      { name: "Keyboard", quantity: 1 },
    ],
    notes: "",
  },
];

const OrderHistoryTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const userID = useSelector((state) => state.auth.user);

  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    async function fetchAndMapOrders() {
      try {
        const response = await api.get(
          "api/Order/GetOrderDetailsByUserId/33ec8700-d47c-4a45-a11e-48ddb18583a5"
        );
        const apiData = response.data;
        console.log("apiData", apiData);

        const mappedData = apiData.map((order) => ({
          id: order.orderId,
          status: order.orderState.toLowerCase(),
          total: formatPrice(order.totalPrice),
          date: new Date(order.orderTime).toISOString().split("T")[0],
          promoCode: order.voucherApplied,
          paymentMethod: order.paymentMethod.toLowerCase().replace(/\s/g, "_"),
          products: order.orderDetails.map((detail) => ({
            name: detail.item.itemName,
            quantity: detail.quantity,
            price: formatPrice(detail.item.price),
          })),
        }));

        setOrders(mappedData);
      } catch (error) {
        console.error("Failed to fetch and map orders:", error);
      }
    }

    fetchAndMapOrders();
  }, [userID]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getPaymentIcon = (method) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="w-5 h-5 text-gray-500" />;
      case "wallet":
        return <Wallet className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShowDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  return (
    <Card className=" rounded-lg border shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Mã đơn hàng</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
            <Table.HeadCell>Tổng giá</Table.HeadCell>
            <Table.HeadCell>Thời gian đặt</Table.HeadCell>
            <Table.HeadCell>Mã khuyến mãi</Table.HeadCell>
            <Table.HeadCell>Phương thức thanh toán</Table.HeadCell>
            <Table.HeadCell>Thao tác</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {orders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-muted/50 transition-colors"
              >
                <Table.Cell className="font-medium">{order.id}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>{order.total}</Table.Cell>
                <Table.Cell>{formatDate(order.date)}</Table.Cell>
                <Table.Cell>
                  {order.promoCode ? (
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-primary" />
                      <span>{order.promoCode}</span>
                    </div>
                  ) : (
                    "-"
                  )}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    {getPaymentIcon(order.paymentMethod)}
                    <span className="capitalize">
                      {order.paymentMethod.replace("_", " ")}
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    gradientDuoTone="redToYellow"
                    size="sm"
                    onClick={() => handleShowDetail(order)}
                    s
                    className="flex text-white items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Xem chi tiết
                  </Button>
                </Table.Cell>
              </motion.tr>
            ))}
          </Table.Body>
        </Table>
      </div>

      <OrderDetailModal
        show={showDetailModal}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </Card>
  );
};

export default OrderHistoryTable;
