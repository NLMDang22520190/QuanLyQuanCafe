import React from "react";
import { Link } from "react-router-dom";

const MenuItemTypeDisplay = ({ category }) => {
  return (
    <Link
      className={`w-24 flex-none mb-2 ${
        category.active ? "text-orange-500" : "text-gray-500"
      }`}
    >
      <img
        src={category.image}
        alt={category.alt}
        className="mb-2 rounded-full"
      />
      <p className="text-center text-sm">{category.name}</p>
    </Link>
  );
};

export default MenuItemTypeDisplay;
