import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MenuItem.css";

const MenuItem = ({
  item,
  userId,
  editMode,
  onRemove,
  onEditToggle,
  onSaveEdit,
}) => {
  // Ensure item and item.item are defined before accessing properties
  if (!item || !item.item) {
    return <div className="cart-item">Invalid item data</div>;
  }

  const [quantity, setQuantity] = useState(item.quantity);
  const [notes, setNotes] = useState(item.notes || "");
  const [adjustment, setAdjustment] = useState(item.adjustment || "None");

  const handleSave = () => {
    if (quantity < 1) {
      alert("Số lượng phải lớn hơn 0!");
      return;
    }

    // Pass updated data back to the parent component (CartInfo)
    onSaveEdit(item.cartDetailId, { quantity, notes, adjustment });
  };

  return (
    <div className="cart-item">
      <div className="item-details">
        {editMode ? (
          <div className="edit-mode">
            {/* Quantity */}
            <div className="form-group">
              <label htmlFor={`quantity-${item.cartDetailId}`}>Số lượng:</label>
              <input
                id={`quantity-${item.cartDetailId}`}
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            {/* Notes */}
            <div className="form-group">
              <label htmlFor={`notes-${item.cartDetailId}`}>Ghi chú:</label>
              <textarea
                id={`notes-${item.cartDetailId}`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ghi chú đặc biệt"
              />
            </div>

            {/* Adjustment */}
            <div className="form-group">
              <label htmlFor={`adjustment-${item.cartDetailId}`}>
                Điều chỉnh:
              </label>
              <input
                id={`adjustment-${item.cartDetailId}`}
                value={adjustment}
                onChange={(e) => setAdjustment(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="edit-buttons">
              <button className="save-button" onClick={handleSave}>
                Lưu
              </button>
              <button className="cancel-button" onClick={onEditToggle}>
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>
              {quantity} x {item.item.itemName}
            </p>
            <div className="item-options">
              <span>Điều chỉnh: {adjustment}</span>
              <p className="item-price">{item.item.price.toLocaleString()}đ</p>
              <p>Ghi chú: {notes || "Không có"}</p>
            </div>
          </>
        )}
      </div>

      <div className="button-container">
        {!editMode && (
          <>
            <button
              className="remove-item"
              onClick={() => onRemove(userId, item.cartDetailId)}
            >
              Xóa
            </button>
            <button className="edit-item-button" onClick={onEditToggle}>
              Sửa
            </button>
          </>
        )}
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired, // Make sure to pass userId
  editMode: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEditToggle: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
};

export default MenuItem;
