import React, { useState } from "react";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderInfo, setOrderInfo] = useState(null);

  // Mock data
  const mockData = {
    1: {
      status: [
        { label: "Order Placed", date: "March 10, 2024" },
        { label: "In Transit", date: "March 12, 2024" },
        { label: "Out for Delivery", date: "March 13, 2024" },
        { label: "Delivered", date: "Pending" },
      ],
    },
  };

  const handleTrack = () => {
    if (mockData[trackingNumber]) {
      setOrderInfo(mockData[trackingNumber].status);
    } else {
      setOrderInfo(null);
      alert("Tracking number not found!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Track Your Order</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label
            htmlFor="trackingNumber"
            className="block text-gray-700 font-medium mb-2"
          >
            Enter your tracking number:
          </label>
          <input
            type="text"
            id="trackingNumber"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter tracking number"
          />
        </div>
        <button
          onClick={handleTrack}
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Track
        </button>

        {orderInfo && (
          <div className="mt-6">
            {orderInfo.map((item, index) => (
              <div
                key={index}
                className={`flex items-center mb-4 ${
                  index === orderInfo.length - 1
                    ? "text-gray-400"
                    : "text-blue-600"
                }`}
              >
                <div
                  className={`w-8 h-8 flex justify-center items-center rounded-full ${
                    index === orderInfo.length - 1
                      ? "bg-gray-200"
                      : "bg-blue-100"
                  }`}
                >
                  <span className="text-xl">&#x2714;</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
