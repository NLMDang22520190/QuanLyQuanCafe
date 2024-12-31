import React from "react";
import { motion } from "framer-motion";
import OrderHistoryTable from "../../../components/Users/OrderHistoryTable/OrderHistoryTable";

const OrderHistory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-cream p-6 md:p-8 lg:p-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-500 rounded-full">
            Đơn hàng
          </span>
          <h1 className="mt-2 text-4xl text-primary-300 font-bold tracking-tight">
            Lịch sử đơn hàng
          </h1>
          <p className="mt-2 text-primary-200 text-muted-foreground">
            Xem lịch sử đơn hàng của bạn tại đây
          </p>
        </div>
        <OrderHistoryTable />
      </div>
    </motion.div>
  );
};

export default OrderHistory;
