// AddItemForm.jsx

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./AddItemForm.css";

const AddItemForm = ({ userId, onAddItem, onClose }) => {
  // Accept userId as a prop
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const testId = "276bfb8a-6f92-458b-819a-afda44ae0582"; // test user ID
  const testing = true; // Set to false for production

  const currentUserId = testing ? testId : userId; // Use testId if testing, else use the actual userId

  useEffect(() => {
    axios
      .get("https://localhost:7087/api/menu-items")
      .then((response) => {
        const availableItems = response.data.filter(
          (item) => item.state === "Available" || item.state === "Còn hàng"
        );
        setMenuItems(availableItems);

        if (availableItems.length > 0) {
          setSelectedItem(availableItems[0].itemId);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const handleAddItem = () => {
    const itemToAdd = menuItems.find((item) => item.itemId === selectedItem);
    if (itemToAdd) {
      const newItem = {
        UserId: currentUserId, // Pass the current userId (either testId or real userId)
        ItemId: itemToAdd.itemId,
        Quantity: quantity,
        Notes: notes,
      };

      onAddItem(newItem);
      onClose();
    }
  };

  return (
    <div className="add-item-form">
      <form>
        <h3>Add Item to Order</h3>
        <label htmlFor="menu-item">Choose Item:</label>
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

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Special instructions"
        />

        <button type="button" onClick={handleAddItem}>
          Add to Cart
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

AddItemForm.propTypes = {
  userId: PropTypes.string.isRequired, // Add userId prop validation
  onAddItem: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddItemForm;
