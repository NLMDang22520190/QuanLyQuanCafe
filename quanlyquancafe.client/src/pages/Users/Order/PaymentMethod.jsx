import React from "react";
import "./PaymentMethod.css";

const PaymentMethod = () => {
  return (
    <div className="payment-method">
      <h3>Phương thức thanh toán</h3>
      <div className="payment-options">
        <label>
          <input type="radio" name="payment" />
          <img
            className="payment-icon"
            src="https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg"
          />
          <span>Tiền mặt</span>
        </label>
        <label>
          <input type="radio" name="payment" />
          <img
            className="payment-icon"
            src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png"
          />
          <span>MoMo</span>
        </label>
        <label>
          <input type="radio" name="payment" />
          <img
            className="payment-icon"
            src="https://minio.thecoffeehouse.com/image/tchmobileapp/388_ic_zalo@3x.png"
          />
          <span>ZaloPay</span>
        </label>
        <label>
          <input type="radio" name="payment" />
          <img
            className="payment-icon"
            src="https://minio.thecoffeehouse.com/image/tchmobileapp/1120_1119_ShopeePay-Horizontal2_O.png"
          />
          <span>ShopeePay</span>
        </label>
        <label>
          <input type="radio" name="payment" />
          <img
            className="payment-icon"
            src="https://minio.thecoffeehouse.com/image/tchmobileapp/385_ic_atm@3x.png"
          />
          <span>Thẻ ngân hàng</span>
        </label>
      </div>
      <div className="terms">
        <input type="checkbox" />
        <span>
          Đồng ý với các <a href="#">điều khoản và điều kiện</a> mua hàng của
          The Coffee House
        </span>
      </div>
    </div>
  );
};

export default PaymentMethod;
