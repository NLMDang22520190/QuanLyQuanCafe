import React, { useState, useEffect } from "react";
import MenuItem from "../../../components/Users/MenuItem/MenuItem";
import AddItemForm from "../../../components/Users/AddItemForm/AddItemForm";
import "./CartInfo.css";
import OrderButton from "../../../components/Users/OrderButton/OrderButton";

const CartInfo = ({ userId }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card"); // Example default payment method

  const testing = true;
  const testUserId = "276bfb8a-6f92-458b-819a-afda44ae0582";
  const currentUserId = testing ? testUserId : userId;

  // Fetch cart details when component mounts or userId changes
  useEffect(() => {
    fetchCartDetails(currentUserId);
  }, [currentUserId]);

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
      setOrderItems(data || []);
    } catch (error) {
      setErrorMessage(`Error loading cart details: ${error.message}`);
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch(
        "https://localhost:7087/api/Cart/AddItemToCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUserId,
            itemId: newItem.ItemId,
            quantity: newItem.Quantity,
            notes: newItem.Notes,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart.");
      }

      const addedItem = await response.json();
      setOrderItems((prevItems) => [...prevItems, addedItem]);
      console.log("Item added to cart successfully!");
    } catch (error) {
      setErrorMessage(`Error adding item: ${error.message}`);
      console.error("Add Item Error:", error);
    }
  };

  const saveEditedItem = async (cartDetailId, updatedData) => {
    const cartItem = orderItems.find(
      (item) => item.cartDetailId === cartDetailId
    );
    const cartId = cartItem.cartId;

    const requestBody = {
      userId: currentUserId,
      cartId: cartId,
      cartDetailId: cartDetailId,
      quantity: updatedData.quantity,
      notes: updatedData.notes,
      adjustment: updatedData.adjustment || "",
    };

    try {
      const response = await fetch(
        `https://localhost:7087/api/Cart/UpdateCartDetail`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save item changes.");
      }

      setOrderItems((prevItems) =>
        prevItems.map((item) =>
          item.cartDetailId === cartDetailId
            ? { ...item, ...updatedData }
            : item
        )
      );
      setEditingItemId(null);
      console.log("Item updated successfully!");
    } catch (error) {
      setErrorMessage(`Error saving item: ${error.message}`);
      console.error("Save Edit Error:", error);
    }
  };

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

  return (
    <div className="cart-info">
      <h2>Your Cart</h2>
      {isLoading ? (
        <p>Loading cart...</p>
      ) : (
        <div>
          {orderItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="menu-items-container">
              {orderItems.map((item) => (
                <MenuItem
                  key={item.cartDetailId}
                  item={item}
                  userId={currentUserId}
                  editMode={item.cartDetailId === editingItemId}
                  onRemove={(userId, itemId) =>
                    removeItemFromCart(userId, itemId)
                  }
                  onEditToggle={() =>
                    setEditingItemId(
                      item.cartDetailId === editingItemId
                        ? null
                        : item.cartDetailId
                    )
                  }
                  onSaveEdit={saveEditedItem}
                />
              ))}
            </div>
          )}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      )}

      {!isAddingItem && (
        <button onClick={() => setIsAddingItem(true)}>Add Item</button>
      )}

      {isAddingItem && (
        <AddItemForm
          userId={currentUserId}
          onAddItem={handleAddItem}
          onClose={() => setIsAddingItem(false)}
        />
      )}

      <h1>
        {/* Pass the required props to OrderButton */}
        {orderItems.length > 0 && !isLoading && (
          <OrderButton
            cart={orderItems}
            userId={currentUserId}
            paymentMethod={paymentMethod} // Example payment method
            onOrderSuccess={(orderData) => {
              // You can add functionality to handle the order success here
              alert(
                `Order placed successfully! Order ID: ${orderData.orderId}`
              );
              setOrderItems([]); // Clear the cart after successful order
            }}
          />
        )}
      </h1>
    </div>
  );
};

export default CartInfo;
