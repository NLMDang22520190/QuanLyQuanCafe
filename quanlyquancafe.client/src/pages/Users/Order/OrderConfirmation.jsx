import React, { useState, useEffect } from "react";
import ShippingInfo from "./ShippingInfo";
import PaymentMethod from "./PaymentMethod";
import CartInfo from "./CartInfo";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  // State để lưu kích thước cửa sổ
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Hook để theo dõi sự thay đổi kích thước cửa sổ
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Thêm sự kiện resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="order-confirmation">
      <h2>Xác nhận đơn hàng</h2>

      {/* Điều chỉnh thứ tự các component dựa trên kích thước màn hình */}
      {isMobile ? (
        <>
          <ShippingInfo />
          <CartInfo />
          <PaymentMethod />
        </>
      ) : (
        <>
          <div className="order-content">
            <div className="left-column">
              <ShippingInfo />
              <PaymentMethod />
            </div>
            <div className="right-column">
              <CartInfo />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderConfirmation;
