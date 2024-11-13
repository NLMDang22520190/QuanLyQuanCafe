import React, { useState } from "react";
import "./AddressModal.css";

const AddressModal = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState("");

  const handleSelectAddress = () => {
    console.log("Địa chỉ đã chọn:", address);
    onClose();
  };

  const handleClearAddress = () => {
    setAddress("");
  };

  if (!isOpen) return null;

  return (
    <div className="address-modal-overlay">
      <div className="address-modal">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <h3>Giao hàng</h3>
        <input
          type="text"
          placeholder="Vui lòng nhập địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="modal-buttons">
          <button
            className="confirm-address-button"
            onClick={handleSelectAddress}
          >
            Chọn địa chỉ
          </button>
          <button className="new-address-button" onClick={handleClearAddress}>
            Chọn địa chỉ mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
    