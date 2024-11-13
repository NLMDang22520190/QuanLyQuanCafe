// MenuItem.jsx
import React from "react";
import PropTypes from "prop-types";
import "./MenuItem.css"; // Import CSS

const MenuItem = ({ name, quantity, size, price, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="item-details">
        <p>
          {quantity} x {name}
        </p>
        <div className="item-options">
          <span>{size}</span>
          <p className="item-price">{price.toLocaleString()}đ</p>
        </div>
      </div>
      <button className="remove-item" onClick={onRemove}>
        Xóa
      </button>
    </div>
  );
};

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default MenuItem;
