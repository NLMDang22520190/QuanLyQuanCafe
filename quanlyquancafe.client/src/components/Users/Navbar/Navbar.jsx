import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-bold">THE COFFEE HOUSE</div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700">
            Cà phê
          </a>
          <a href="#" className="text-gray-700">
            Trà
          </a>
          <a href="#" className="text-gray-700">
            Menu
          </a>
          <a href="#" className="text-gray-700">
            Chuyện Nhà
          </a>
          <a href="#" className="text-gray-700">
            Cảm hứng CloudFee
          </a>
          <a href="#" className="text-gray-700">
            Cửa hàng
          </a>
          <a href="#" className="text-gray-700">
            Tuyển dụng
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
