import React from "react";
import { motion } from "framer-motion";

const HeroHeaderSection = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <span className="font-mono inline-block px-4 py-1 mb-4 text-sm font-medium text-primary-600 bg-primary-50 rounded-full">
          Rise and Drink
        </span>
        <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-primary-800 mb-6 tracking-tight">
          Khám Phá Hương Vị Đậm Đà Của Các Dòng Cà Phê Tự Chế
        </h1>
        <p className="text-lg sm:text-xl text-primary-600 mb-8">
          Đánh Thức Các Giác Quan Với Mỗi Ngụm Và Trải Nghiệm Cà Phê Như Chưa
          Từng Có.
        </p>
        <button
          // onClick={handleShopClick}
          className="transition-all duration-300 ease-out hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 bg-primary-500 text-white px-8 py-3 rounded-lg font-medium"
        >
          Đặt hàng
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="aspect-w-16 aspect-h-9">
          <img
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=2000&q=80"
            alt="Coffee beans being roasted"
            className="object-cover w-full h-full"
            style={{
              opacity: 1 ? 1 : 0,
              transition: "opacity 0.7s ease-out",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroHeaderSection;
