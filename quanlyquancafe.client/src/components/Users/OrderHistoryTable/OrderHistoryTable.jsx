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
import { Button, Table, Card, Dropdown, Pagination } from "flowbite-react";
import { useSelector } from "react-redux";
import api from "../../../features/AxiosInstance/AxiosInstance";

const OrderHistoryTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const userID = useSelector((state) => state.auth.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    async function fetchAndMapOrders() {
      try {
        const response = await api.get(
          `api/Order/GetOrderDetailsByUserId/${userID}`
        );
        const apiData = response.data;

        // Sắp xếp theo thời gian đặt sớm nhất
        apiData.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));

        const mappedData = apiData.map((order) => ({
          id: order.orderId,
          status: order.orderState.toLowerCase(),
          total: formatPrice(order.totalPrice),
          date: new Date(order.orderTime).toISOString().split("T")[0],
          promoCode: order.voucherCode ? order.voucherCode : "Không có",
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
      case "chờ xác nhận":
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
            {paginatedOrders.map((order) => (
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

      <div className="flex justify-between items-center mt-4">
        <Dropdown
          outline
          color="teal"
          label={`Hiển thị ${itemsPerPage} mục`}
          onSelect={(e) => handleItemsPerPageChange(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((size) => (
            <Dropdown.Item
              key={size}
              onClick={() => handleItemsPerPageChange(size)}
            >
              {size} mục/trang
            </Dropdown.Item>
          ))}
        </Dropdown>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(orders.length / itemsPerPage)}
        />
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
