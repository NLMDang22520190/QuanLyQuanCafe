// src/pages/CartInfo/CartInfo.jsx
import React, { useState } from "react";
import MenuItem from "../../../components/Users/MenuItem/MenuItem";
import PromoModal from "../../../components/Users/PromoModal/PromoModal"; // Import PromoModal
import "./CartInfo.css";

const CartInfo = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Túi Nut Cracker 200g",
      quantity: 1,
      size: "Vừa",
      price: 199000,
    },
    { id: 2, name: "Cà Phê Đen 250g", quantity: 1, size: "Nhỏ", price: 120000 },
    { id: 3, name: "Trà Sữa Matcha", quantity: 2, size: "Lớn", price: 55000 },
    { id: 4, name: "Bánh Quy Mặn", quantity: 1, size: "Vừa", price: 15000 },
    { id: 5, name: "Cà Phê Sữa", quantity: 1, size: "Lớn", price: 90000 },
    { id: 6, name: "Trà Đào", quantity: 2, size: "Vừa", price: 30000 },
  ]);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 25000;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handlePromoCodeApply = (promoCode) => {
    alert(`Áp dụng mã khuyến mại: ${promoCode}`);
    setIsModalOpen(false);
  };

  return (
    <div className="cart-info">
      <div className="cart-header">
        <h3>Các món đã chọn</h3>
        <button className="add-more">Thêm món</button>
      </div>

      <div className="cart-items-list">
        {cartItems.map((item) => (
          <MenuItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            size={item.size}
            price={item.price}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      <button className="delete-order" onClick={clearCart}>
        Xóa đơn hàng
      </button>

      <div className="cart-summary">
        <h3>Tổng cộng</h3>
        <div className="summary-item">
          <p>Thành tiền</p>
          <p>{totalAmount.toLocaleString()}đ</p>
        </div>
        <div className="summary-item">
          <p>Phí giao hàng</p>
          <p>{shippingFee.toLocaleString()}đ</p>
        </div>
        <button className="discount" onClick={() => setIsModalOpen(true)}>
          Khuyến mãi
        </button>
      </div>

      <div className="total-amount">
        <strong>Thành tiền</strong>
        <strong>{(totalAmount + shippingFee).toLocaleString()}đ</strong>
      </div>

      <div className="cart-footer">
        <button className="confirm-order">Đặt hàng</button>
      </div>

      {/* Sử dụng PromoModal ở đây */}
      <PromoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handlePromoCodeApply}
      />
    </div>
  );
};

export default CartInfo;
