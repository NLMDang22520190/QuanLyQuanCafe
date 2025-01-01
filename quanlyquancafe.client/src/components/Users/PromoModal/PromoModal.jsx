import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PromoModal.css";

const PromoModal = ({ isOpen, onClose, onApply, userPoints, orderTotal }) => {
  const [promoCode, setPromoCode] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch vouchers from the API
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7087/api/Voucher/GetAllVouchers"
        );
        setVouchers(response.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        setVouchers([]);
      }
    };

    if (isOpen) {
      fetchVouchers();
    }
  }, [isOpen]);

  // Handle promo code input change
  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
    setErrorMessage(""); // Clear any previous error messages
  };

  // Validate and apply the promo code
  const handleApplyPromoCode = () => {
    const currentDate = new Date();

    const validVoucher = vouchers.find(
      (voucher) =>
        voucher.voucherCode === promoCode &&
        new Date(voucher.voucherStartDate) <= currentDate &&
        new Date(voucher.voucherEndDate) >= currentDate
    );

    if (!validVoucher) {
      setErrorMessage("Mã khuyến mãi không hợp lệ hoặc đã hết hạn.");
      return;
    }

    // Check if the order total meets the minimum order amount
    if (orderTotal < validVoucher.minOrderAmount) {
      setErrorMessage(
        `Đơn hàng phải có giá trị tối thiểu ${validVoucher.minOrderAmount.toLocaleString()}đ.`
      );
      return;
    }

    // Check if the user has enough points
    if (userPoints < validVoucher.pointsRequired) {
      setErrorMessage(
        `Bạn cần ${validVoucher.pointsRequired} điểm để sử dụng mã này.`
      );
      return;
    }

    // Voucher is valid
    onApply(validVoucher);
    setPromoCode(""); // Clear input after applying
    setErrorMessage(""); // Clear error message
  };

  if (!isOpen) return null;

  return (
    <div className="promo-modal">
      <div className="promo-modal-content">
        <div className="modal-header">
          <h3>Khuyến mãi</h3>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={promoCode}
            onChange={handlePromoCodeChange}
            placeholder="Nhập mã khuyến mại"
            className="promo-input"
          />
          <button className="apply-promo" onClick={handleApplyPromoCode}>
            Áp dụng
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default PromoModal;
