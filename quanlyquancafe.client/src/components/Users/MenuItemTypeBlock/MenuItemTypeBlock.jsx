import React from "react";

const MenuItemTypeBlock = ({ sortingOptions, active, onChange }) => {
  return (
    <div className="flex overflow-x-auto md:flex-wrap justify-stretch md:justify-center space-x-6 mb-8">
      {sortingOptions.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`w-24 flex-none mb-2 ${
            active === option
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <img
            src={category.image}
            alt={category.alt}
            className="mb-2 rounded-full"
          />
          <p className="text-center text-sm">{category.name}</p>
        </button>
      ))}
    </div>
  );
};

export default MenuItemTypeBlock;
