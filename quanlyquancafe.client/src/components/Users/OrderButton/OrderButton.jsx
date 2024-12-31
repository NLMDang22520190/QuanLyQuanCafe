import React, { useState } from "react";
import axios from "axios";
import "./OrderButton.css";

const OrderButton = ({ cart, userId, paymentMethod, onOrderSuccess }) => {
  // State management for order status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  // Handle placing the order
  const handleOrderClick = async () => {
    // Basic validation
    if (!cart || cart.length === 0) {
      setError("Your cart is empty. Add items to the cart.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Print out the orderRequest data
    const orderRequest = {
      userId: userId,
      paymentMethod: paymentMethod,
      cartDetails: cart, // Assuming `cart` is an array of items in the cart
    };

    console.log("Sending order request:", orderRequest); // Log the data you're sending

    // Construct the URL and print it for debugging
    const apiUrl = "http://localhost:7087/api/order/CartToOrder"; // Full URL with localhost
    console.log("API URL:", apiUrl); // Log the URL you're hitting

    try {
      // Send the request and check the response
      const response = await axios.post(apiUrl, orderRequest);

      console.log("Response Status:", response.status); // Print response status
      console.log("Response Data:", response.data); // Print response data

      if (response.status === 200) {
        setOrderId(response.data.orderId);
        onOrderSuccess(response.data); // Handle order success, like clearing the cart
      }
    } catch (err) {
      // Handle error from API call
      console.error("Error placing order:", err);
      setError(`An error occurred while placing your order: ${err.message}`);

      // Additional debug info:
      if (err.response) {
        console.log("Error Response Status:", err.response.status); // Log status code
        console.log("Error Response Data:", err.response.data); // Log the error response body
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}

      {orderId ? (
        <div className="order-success">
          <h3>Order Placed Successfully!</h3>
          <p>Your order ID is: {orderId}</p>
          <p>Thank you for your order!</p>
        </div>
      ) : (
        <button
          onClick={handleOrderClick}
          disabled={isLoading}
          className={`order-button ${isLoading ? "loading" : ""}`}
        >
          {isLoading ? "Placing Order..." : "Place Order"}
        </button>
      )}
    </div>
  );
};

export default OrderButton;
