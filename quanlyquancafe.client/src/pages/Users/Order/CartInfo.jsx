import React, { useState, useEffect } from "react";
import MenuItem from "../../../components/Users/MenuItem/MenuItem";
import PromoModal from "../../../components/Users/PromoModal/PromoModal";
import AddItemForm from "../../../components/Users/AddItemForm/AddItemForm"; // Import AddItemForm
import "./CartInfo.css";

const CartInfo = () => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isAddingItem, setIsAddingItem] = useState(false); // Track if "Add Item" form is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (newItem) => {
    setCartItems([...cartItems, newItem]);
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateItem = (itemId, updatedFields) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, ...updatedFields } : item
      )
    );
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.item.price * item.quantity,
    0
  );
  const shippingFee = 25000;

  return (
    <div className="cart-info">
      <div className="cart-header">
        <h3>Các món đã chọn</h3>
        <button className="add-more" onClick={() => setIsAddingItem(true)}>
          Thêm món
        </button>
      </div>

      <div className="cart-items-list">
        {cartItems.map((item) => (
          <MenuItem
            key={item.itemId}
            item={item}
            editMode={item.editMode || false} // Use editMode from the item
            onRemove={() => removeItem(item.itemId)}
            onEditToggle={() =>
              updateItem(item.itemId, { editMode: !item.editMode })
            }
            onSaveEdit={(updatedFields) => {
              updateItem(item.itemId, { ...updatedFields, editMode: false });
            }}
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

      {isAddingItem && (
        <AddItemForm
          onAddItem={addItemToCart}
          onClose={() => setIsAddingItem(false)}
        />
      )}

      <PromoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={(promoCode) => alert(`Áp dụng mã khuyến mại: ${promoCode}`)}
      />
    </div>
  );
};

export default CartInfo;
