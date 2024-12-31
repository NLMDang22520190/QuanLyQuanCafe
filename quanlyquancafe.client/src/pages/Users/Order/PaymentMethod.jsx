import React, { useState } from "react";
import "./PaymentMethod.css";

const PaymentMethod = ({ onPaymentMethodSelected }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Handle the selection of a payment method
  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    if (onPaymentMethodSelected) {
      onPaymentMethodSelected(event.target.value); // Pass the selected payment method to the parent
    }
  };

  // Handle the acceptance of terms and conditions
  const handleTermsChange = (event) => {
    setIsTermsAccepted(event.target.checked);
  };

  return (
    <div className="payment-method">
      <h3>Phương thức thanh toán</h3>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={selectedPaymentMethod === "cash"}
            onChange={handlePaymentChange}
          />
          <img
            className="payment-icon"
            src="https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg"
            alt="Cash"
          />
          <span>Tiền mặt</span>
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="momo"
            checked={selectedPaymentMethod === "momo"}
            onChange={handlePaymentChange}
          />
          <img
            className="payment-icon"
            src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png"
            alt="MoMo"
          />
          <span>MoMo</span>
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="zalopay"
            checked={selectedPaymentMethod === "zalopay"}
            onChange={handlePaymentChange}
          />
          <img
            className="payment-icon"
            src="https://minio.thecoffeehouse.com/image/tchmobileapp/388_ic_zalo@3x.png"
            alt="ZaloPay"
          />
          <span>ZaloPay</span>
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="shopeepay"
            checked={selectedPaymentMethod === "shopeepay"}
            onChange={handlePaymentChange}
          />
          <img
            className="payment-icon"
            src="https://minio.thecoffeehouse.com/image/tchmobileapp/1120_1119_ShopeePay-Horizontal2_O.png"
            alt="ShopeePay"
          />
          <span>ShopeePay</span>
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="atm"
            checked={selectedPaymentMethod === "atm"}
            onChange={handlePaymentChange}
          />
          <img
            className="payment-icon"
            src="https://minio.thecoffeehouse.com/image/tchmobileapp/385_ic_atm@3x.png"
            alt="ATM Card"
          />
          <span>Thẻ ngân hàng</span>
        </label>
      </div>
      <div className="terms">
        <input
          type="checkbox"
          checked={isTermsAccepted}
          onChange={handleTermsChange}
        />
        <span>
          Đồng ý với các <a href="#">điều khoản và điều kiện</a> mua hàng của
          The Coffee House
        </span>
      </div>

      {/* Disable the confirm button if no payment method is selected or terms are not accepted */}
      <button
        className="confirm-btn"
        disabled={!selectedPaymentMethod || !isTermsAccepted}
      >
        Xác nhận
      </button>
    </div>
  );
};

export default PaymentMethod;
