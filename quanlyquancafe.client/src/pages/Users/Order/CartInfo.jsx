import React, { useState, useEffect } from "react";
import MenuItem from "../../../components/Users/MenuItem/MenuItem";
import AddItemForm from "../../../components/Users/AddItemForm/AddItemForm";
import "./CartInfo.css";

const CartInfo = ({ userId }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  const testing = true; // Set to false for production
  const testUserId = "276bfb8a-6f92-458b-819a-afda44ae0582"; // Example user ID for testing

  // Define currentUserId
  const currentUserId = testing ? testUserId : userId; // Use testUserId for testing, otherwise use the passed userId

  // Fetch cart details when component mounts or userId changes
  useEffect(() => {
    fetchCartDetails(currentUserId); // Use currentUserId here
  }, [currentUserId]);

  // Fetch cart details from the API
  const fetchCartDetails = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7087/api/Cart/GetCartDetailsByCustomerId/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart details.");
      }
      const data = await response.json();
      setOrderItems(data || []); // Set order items if available
    } catch (error) {
      setErrorMessage(`Error loading cart details: ${error.message}`);
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save edited item to the cart
  const saveEditedItem = async (cartDetailId, updatedData) => {
    // Extract the cartId from the orderItems state
    const cartItem = orderItems.find(
      (item) => item.cartDetailId === cartDetailId
    );
    const cartId = cartItem.cartId; // Assuming cartId is available in the item

    const requestBody = {
      userId: currentUserId, // Use the currentUserId state or prop
      cartId: cartId,
      cartDetailId: cartDetailId,
      quantity: updatedData.quantity,
      notes: updatedData.notes,
      adjustment: updatedData.adjustment || "", // Assuming you might want to set an adjustment (e.g., discounts)
    };

    try {
      // Send the updated item to the backend using a PUT request
      const response = await fetch(
        `https://localhost:7087/api/Cart/UpdateCartDetail`, // Endpoint to update the item in the cart
        {
          method: "PUT", // or PATCH, depending on your API design
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save item changes.");
      }

      // Update the state to reflect the changes
      setOrderItems((prevItems) =>
        prevItems.map((item) =>
          item.cartDetailId === cartDetailId
            ? { ...item, ...updatedData }
            : item
        )
      );
      setEditingItemId(null); // Exit edit mode after saving
      console.log("Item updated successfully!");
    } catch (error) {
      setErrorMessage(`Error saving item: ${error.message}`);
      console.error("Save Edit Error:", error);
    }
  };

  // Remove item from the cart using the API
  const removeItemFromCart = async (userId, itemId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      try {
        const response = await fetch(
          `https://localhost:7087/api/Cart/RemoveItemFromCart/${userId}/${itemId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to remove item.");
        }
        setOrderItems((prevItems) =>
          prevItems.filter((item) => item.cartDetailId !== itemId)
        );
        console.log("Item removed successfully!");
      } catch (error) {
        setErrorMessage(`Error removing item from cart: ${error.message}`);
        console.error("Remove Item Error:", error);
      }
    }
  };

  // Calculate the total amount for the cart
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
              key={item.cartDetailId}
              item={item}
              userId={currentUserId}
              editMode={editingItemId === item.cartDetailId}
              onRemove={removeItemFromCart}
              onEditToggle={() =>
                setEditingItemId(
                  editingItemId === item.cartDetailId ? null : item.cartDetailId
                )
              }
              onSaveEdit={saveEditedItem}
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
          onAddItem={() => {}}
          onClose={() => setIsAddingItem(false)}
        />
      )}
    </div>
  );
};

export default CartInfo;
