import React from "react";

export const OrderDetails = ({ orderNumber, estimatedDelivery, currentLocation }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-blue-100 animate-fade-in hover:shadow-xl transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-200 to-blue-50 p-4 rounded-lg border border-blue-300 shadow-md">
          <h3 className="text-sm font-medium text-primary">Mã số đơn hàng</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">{orderNumber}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-200 to-green-50 p-4 rounded-lg border border-green-300 shadow-md">
          <h3 className="text-sm font-medium text-secondary">Ngày đặt hàng</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">{estimatedDelivery}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-200 to-purple-50 p-4 rounded-lg border border-purple-300 shadow-md">
          <h3 className="text-sm font-medium text-purple-600">Địa điểm cửa hàng</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">{currentLocation}</p>
        </div>
      </div>
    </div>
  );
};

