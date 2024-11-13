import React, { useState } from "react";
import "./ShippingInfo.css";
import AddressModal from "../../../components/Users/AddressModal/AddressModal";

const ShippingInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="shipping-info">
      <div className="order-content">
        <h3>Giao hàng</h3>
        <button className="change-address" onClick={handleOpenModal}>
          Đổi phương thức
        </button>
      </div>

      <div className="address-info">
        <div className="address-icon">🚚</div>
        <div className="address-details">
          <p className="address-title">51 Huỳnh Đình Hai</p>
          <p>51 Huỳnh Đình Hai, Phường 14, Bình Thạnh, Hồ Chí Minh, Việt Nam</p>
        </div>
      </div>

      <div className="recipient-info">
        <input type="text" placeholder="Tên người nhận" />
        <input type="text" placeholder="Số điện thoại" />
        <input type="email" placeholder="Email người nhận" />
        <input type="text" placeholder="Thêm hướng dẫn giao hàng" />
      </div>

      {/* Hiển thị AddressModal */}
      <AddressModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ShippingInfo;
