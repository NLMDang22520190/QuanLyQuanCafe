import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "./AddItemForm.css";

const AddItemForm = ({ onClose, onAddItem }) => {
  const [menuItems, setMenuItems] = useState([]); // State to store fetched menu items
  const [selectedItem, setSelectedItem] = useState(null); // State for the selected item
  const [quantity, setQuantity] = useState(1); // State for item quantity
  const [notes, setNotes] = useState(""); // State for item notes
  const [adjustments, setAdjustments] = useState(""); // State for item adjustments

  // Fetch menu items from API on component mount
  useEffect(() => {
    axios
      .get("https://localhost:7087/api/MenuItem")
      .then((response) => {
        setMenuItems(response.data); // Set the response data to the menuItems state
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  // Handle form submission
  const handleAddItem = () => {
    if (!selectedItem) return; // Don't add if no item is selected
    const newItem = {
      itemId: selectedItem.itemId,
      quantity,
      notes,
      adjustments,
      item: selectedItem,
    };
    onAddItem(newItem);
    onClose(); // Close the form after adding the item
  };

  return (
    <div className="add-item-form">
      <form>
        <h3>Chọn món để thêm vào giỏ hàng</h3>

        {/* Display menu items */}
        <label>Chọn món</label>
        <select
          value={selectedItem ? selectedItem.itemId : ""}
          onChange={(e) => {
            const selected = menuItems.find(
              (item) => item.itemId === Number(e.target.value)
            );
            setSelectedItem(selected);
          }}
        >
          <option value="">-- Chọn món --</option>
          {menuItems.map((item) => (
            <option key={item.itemId} value={item.itemId}>
              {item.itemName} - {item.price.toLocaleString()}đ
            </option>
          ))}
        </select>

        {selectedItem && (
          <div className="item-details">
            <h4>{selectedItem.itemName}</h4>
            <p>{selectedItem.description}</p>
            <p>
              <strong>{selectedItem.price.toLocaleString()}đ</strong>
            </p>
            <p>{selectedItem.state}</p>
            {selectedItem.picture && (
              <img
                src={selectedItem.picture}
                alt={selectedItem.itemName}
                className="item-picture"
              />
            )}
          </div>
        )}

        <label>Số lượng</label>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <label>Ghi chú</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ghi chú thêm cho món ăn"
        />

        <label>Điều chỉnh</label>
        <textarea
          value={adjustments}
          onChange={(e) => setAdjustments(e.target.value)}
          placeholder="Điều chỉnh món ăn"
        />

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

export default AddItemForm;
