import React, { useState, useEffect } from "react";
import MenuItem from "../../../components/Users/MenuItem/MenuItem";
import AddItemForm from "../../../components/Users/AddItemForm/AddItemForm";
import "./CartInfo.css";

const CartInfo = ({ userId }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(null);

  const testing = true; // Set to false for production
  const testUserId = "276bfb8a-6f92-458b-819a-afda44ae0582"; // Example user ID for testing

  useEffect(() => {
    if (testing) {
      console.log("Testing mode: Using default testUserId");
      fetchCartDetails(testUserId);
    } else {
      fetchCartDetails(userId);
    }
  }, [userId]);

  const fetchCartDetails = async (id) => {
    setIsLoading(true);
    try {
      console.log("Fetching cart details for userId:", id);
      const response = await fetch(
        `https://localhost:7087/api/Cart/GetCartDetailsByCustomerId/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart details.");
      }
      const data = await response.json();
      console.log("Fetched cart details:", data);
      setOrderItems(data || []);
    } catch (error) {
      setErrorMessage(`Error loading cart details: ${error.message}`);
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove an item from the cart
  const removeItemFromCart = async (itemId) => {
    try {
      const requestBody = {
        UserId: testing ? testUserId : userId,
        ItemId: itemId, // Now using the correct itemId
      };

      console.log("UserId:", requestBody.UserId);
      console.log("ItemId:", requestBody.ItemId);

      const response = await fetch(
        "https://localhost:7087/api/Cart/RemoveItemFromCart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Error Response:", errorResponse);
        throw new Error(
          errorResponse.message || "Failed to remove item from cart."
        );
      }

      console.log("Item removed successfully. Updating UI...");
      setOrderItems(
        (prevItems) => prevItems.filter((item) => item.cartDetailId !== itemId) // Filter by cartDetailId
      );
    } catch (error) {
      setErrorMessage(`Error removing item from cart: ${error.message}`);
      console.error("Remove Item Error Details:", error);
    }
  };

  // Save the edited item data
  const saveEditItem = (cartDetailId, updatedData) => {
    console.log("Saving updated item:", { cartDetailId, updatedData });
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.cartDetailId === cartDetailId ? { ...item, ...updatedData } : item
      )
    );
    setEditMode(null);
  };

  const totalAmount = orderItems.reduce(
    (acc, item) => acc + (item.item?.price || 0) * (item.quantity || 0),
    0
  );
  const shippingFee = 25000;

  return (
    <div className="order-info">
      <div className="order-header">
        <h3>Your Order</h3>
        <button className="add-more" onClick={() => setIsAddingItem(true)}>
          Add Item
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="order-items-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          orderItems.map((item) => (
            <MenuItem
              key={item.cartDetailId} // Ensure cartDetailId is used as the key
              item={item}
              editMode={editMode === item.cartDetailId} // Edit mode management by cartDetailId
              onRemove={() => removeItemFromCart(item.cartDetailId)} // Pass cartDetailId for removal
              onEditToggle={() =>
                setEditMode(
                  editMode === item.cartDetailId ? null : item.cartDetailId
                )
              }
              onSaveEdit={saveEditItem}
            />
          ))
        )}
      </div>

      <div className="order-summary">
        <h3>Total: {totalAmount.toLocaleString()} VND</h3>
        <h4>Shipping Fee: {shippingFee.toLocaleString()} VND</h4>
        <h4>Grand Total: {(totalAmount + shippingFee).toLocaleString()} VND</h4>
      </div>

      {isAddingItem && (
        <AddItemForm
          onAddItem={(newItem) => {
            console.log("Adding new item to cart:", newItem);
            setOrderItems((prevItems) => [...prevItems, newItem]);
            setIsAddingItem(false);
          }}
          onClose={() => setIsAddingItem(false)}
        />
      )}
    </div>
  );
};

export default CartInfo;
