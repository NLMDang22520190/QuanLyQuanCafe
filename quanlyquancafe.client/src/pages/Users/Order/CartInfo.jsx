import React, { useState } from "react";
import MenuItem from "../../../components/Users/MenuItem/MenuItem";
import PromoModal from "../../../components/Users/PromoModal/PromoModal"; // Import PromoModal
import AddItemForm from "../../../components/Users/AddItemForm/AddItemForm"; // Import the new AddItemForm component
import "./CartInfo.css";

const CartInfo = () => {
  const [cartItems, setCartItems] = useState([
    {
      cartDetailId: 1,
      cartId: 101,
      itemId: 1,
      quantity: 1,
      notes: "Chế biến nhẹ",
      adjustments: "Không đường",
      size: "Medium",
      item: {
        itemName: "Túi Nut Cracker 200g",
        price: 199000,
        picture: null,
      },
    },
    {
      cartDetailId: 2,
      cartId: 101,
      itemId: 2,
      quantity: 1,
      notes: "Thêm sữa",
      adjustments: "Đường ít",
      size: "Small",
      item: {
        itemName: "Cà Phê Đen 250g",
        price: 120000,
        picture: null,
      },
    },
    // Add more items as necessary...
  ]);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.item.price * item.quantity,
    0
  );
  const shippingFee = 25000;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null); // Track which item is being edited
  const [isFormOpen, setIsFormOpen] = useState(false); // Track the form visibility

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handlePromoCodeApply = (promoCode) => {
    alert(`Áp dụng mã khuyến mại: ${promoCode}`);
    setIsModalOpen(false);
  };

  const handleEditToggle = (itemId) => {
    setEditMode(editMode === itemId ? null : itemId); // Toggle edit mode for the specific item
  };

  const handleSaveEdit = (itemId, updatedItem) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, ...updatedItem } : item
      )
    );
    setEditMode(null); // Exit edit mode after saving
  };

  const handleAddItem = (newItem) => {
    const newCartItem = {
      cartDetailId: cartItems.length + 1,
      cartId: 101,
      itemId: newItem.itemId,
      quantity: newItem.quantity,
      notes: newItem.notes,
      adjustments: newItem.adjustments,
      size: newItem.size,
      item: {
        itemName: "New Item", // Replace with actual item selection
        price: 100000, // Replace with the selected price
        picture: null,
      },
    };
    setCartItems([...cartItems, newCartItem]);
    setIsFormOpen(false); // Close the form after adding the item
  };

  return (
    <div className="cart-info">
      <div className="cart-header">
        <h3>Các món đã chọn</h3>
        <button className="add-more" onClick={() => setIsFormOpen(true)}>
          Thêm món
        </button>
      </div>

      <div className="cart-items-list">
        {cartItems.map((item) => (
          <MenuItem
            key={item.itemId}
            item={item}
            editMode={editMode === item.itemId}
            onRemove={() => removeItem(item.itemId)}
            onEditToggle={() => handleEditToggle(item.itemId)}
            onSaveEdit={handleSaveEdit}
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

      {/* Promo Modal */}
      <PromoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handlePromoCodeApply}
      />

      {/* Show AddItemForm if isFormOpen is true */}
      {isFormOpen && (
        <AddItemForm
          onAddItem={handleAddItem}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default CartInfo;
