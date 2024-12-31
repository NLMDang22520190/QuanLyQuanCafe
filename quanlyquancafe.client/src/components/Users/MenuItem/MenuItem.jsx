import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MenuItem.css";

const MenuItem = ({ item, editMode, onRemove, onEditToggle, onSaveEdit }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [notes, setNotes] = useState(item.notes || "");
  const [size, setSize] = useState(item.size || "Medium");

  const handleSave = () => {
    if (quantity < 1) {
      alert("Số lượng phải lớn hơn 0!");
      return;
    }

    // Pass updated data back to the parent component (CartInfo)
    onSaveEdit(item.cartDetailId, { quantity, notes, size });
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

            {/* Size */}
            <div className="form-group">
              <label htmlFor={`size-${item.cartDetailId}`}>Kích thước:</label>
              <select
                id={`size-${item.cartDetailId}`}
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="Small">Nhỏ</option>
                <option value="Medium">Vừa</option>
                <option value="Large">Lớn</option>
              </select>
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
              <span>Kích thước: {size}</span>
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
              onClick={() => onRemove(item.cartDetailId)} // Use cartDetailId for removal
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
  editMode: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEditToggle: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
};

export default MenuItem;
