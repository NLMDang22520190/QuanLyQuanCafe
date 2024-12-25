import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MenuItem.css"; // Import CSS

const MenuItem = ({ item, editMode, onRemove, onEditToggle, onSaveEdit }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [notes, setNotes] = useState(item.notes);
  const [size, setSize] = useState(item.size || "Medium"); // Default to 'Medium' if size is not provided

  const handleSave = () => {
    onSaveEdit(item.itemId, { quantity, notes, size });
  };

  return (
    <div className="cart-item">
      <div className="item-details">
        {editMode ? (
          <div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ghi chú"
              />
            </div>

            <div className="form-group">
              <label htmlFor="size">Size</label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <button onClick={handleSave}>Lưu</button>
          </div>
        ) : (
          <>
            <p>
              {quantity} x {item.item.itemName}
            </p>
            <div className="item-options">
              <span>{size}</span> {/* Display selected size */}
              <p className="item-price">{item.item.price.toLocaleString()}đ</p>
            </div>
          </>
        )}
      </div>

      {/* Button container (Remove and Edit buttons) */}
      <div className="button-container">
        {!editMode && (
          <>
            <button className="remove-item" onClick={onRemove}>
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
