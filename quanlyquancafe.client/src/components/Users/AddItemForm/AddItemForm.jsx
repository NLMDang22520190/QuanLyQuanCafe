import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./AddItemForm.css";

const AddItemForm = ({ onAddItem, onClose }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  // Fetch menu items from API
  useEffect(() => {
    axios
      .get("https://localhost:7087/api/menu-items")
      .then((response) => {
        const availableItems = response.data.filter(
          (item) => item.state === "Available" || item.state === "Còn hàng"
        ); // Only include available items
        setMenuItems(availableItems);
        if (availableItems.length > 0) {
          setSelectedItem(availableItems[0].itemId); // Default to the first available item
        }
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const handleAddItem = () => {
    const itemToAdd = menuItems.find((item) => item.itemId === selectedItem);
    if (itemToAdd) {
      onAddItem({
        itemId: itemToAdd.itemId,
        item: itemToAdd,
        quantity,
        notes,
        adjustments: "",
      });
      onClose();
    }
  };

  return (
    <div className="add-item-form">
      <form>
        <h3>Thêm món vào giỏ hàng</h3>

        <label htmlFor="menu-item">Chọn món:</label>
        <select
          id="menu-item"
          value={selectedItem || ""}
          onChange={(e) => setSelectedItem(Number(e.target.value))}
        >
          {menuItems.map((item) => (
            <option key={item.itemId} value={item.itemId}>
              {item.itemName} - {item.price.toLocaleString()}đ
            </option>
          ))}
        </select>

        <label htmlFor="quantity">Số lượng:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <label htmlFor="notes">Ghi chú:</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ghi chú đặc biệt (nếu có)"
        ></textarea>

        <button type="button" onClick={handleAddItem}>
          Thêm vào giỏ
        </button>
        <button type="button" className="cancel-btn" onClick={onClose}>
          Hủy
        </button>
      </form>
    </div>
  );
};

AddItemForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddItemForm;
