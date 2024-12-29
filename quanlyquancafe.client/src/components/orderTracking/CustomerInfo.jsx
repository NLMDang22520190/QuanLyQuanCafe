import React from "react";

const CustomerInfo = ({ name, address, phone }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 w-80">
        <h2 className="text-lg font-bold mb-4">Customer Information</h2>
        <div className="space-y-2">
          <div>
            <span className="font-semibold text-gray-700">Name:</span>
            <p className="text-gray-600">{name}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Address:</span>
            <p className="text-gray-600">{address}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Phone:</span>
            <p className="text-gray-600">{phone}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomerInfo;
  