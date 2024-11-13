// src/components/PromoModal/PromoModal.jsx

import React, { useState } from "react";
import "./PromoModal.css";

const PromoModal = ({ isOpen, onClose, onApply }) => {
  const [promoCode, setPromoCode] = useState("");

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleApplyPromoCode = () => {
    onApply(promoCode);
    setPromoCode(""); // Clear input after applying
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
        </div>
      </div>
    </div>
  );
};

export default PromoModal;
