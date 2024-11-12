import React from 'react';

const TableCard = ({ id, seats, status }) => {
  return (
    <div
      className={`h-32 w-32 p-4 rounded-lg shadow-md flex flex-col justify-center items-center ${
        status === 'available' ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-white'
      }`}
    >
      <h3 className="text-lg font-bold mt-5">{id}</h3>
      <p className="text-sm font-semibold">{seats} Seats</p>
      <p className="text-sm mt-10">{status === 'available' ? 'Available' : 'Occupied'}</p>
    </div>
  );
};

export default TableCard;
