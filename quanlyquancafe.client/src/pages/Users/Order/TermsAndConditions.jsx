import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions">
      <label>
        <input type="checkbox" />
        Đồng ý với các <a href="#terms">điều khoản và điều kiện</a> mua hàng của
        The Coffee House
      </label>
    </div>
  );
};

export default TermsAndConditions;
