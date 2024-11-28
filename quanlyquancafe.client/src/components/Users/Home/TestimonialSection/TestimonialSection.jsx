import React from "react";
import { motion } from "framer-motion";

const TestimonialSection = () => {
  return (
    <div>
      {" "}
      {/* Discover Section */}
      <section className="py-16 border-y border-coffee-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-bold text-primary-800 mb-6">
            Khám Phá Ly Cà Phê Hoàn Hảo Của Bạn
          </h2>
          <p className="text-lg text-primary-600 mb-8">
            Trải nghiệm bộ sưu tập cà phê hảo hạng được chọn lọc kỹ lưỡng và
            nâng tầm thói quen mỗi ngày của bạn.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="transition-all duration-300 ease-out hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 bg-primary-600 text-white px-8 py-3 rounded-lg font-medium">
              Đặt hàng
            </button>
            <button className="transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 bg-white text-primary-800 px-8 py-3 rounded-lg font-medium border border-primary-200">
              Đăng nhập
            </button>
          </div>
        </motion.div>
      </section>
      <section className="py-16 bg-coffee-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative">
              <blockquote className="text-2xl font-medium text-primary-800 mb-6">
                "Rise and Drink đã thay đổi hoàn toàn buổi sáng của tôi! Cà phê
                của họ đậm đà và thơm ngon, khiến mỗi ngụm đều trở thành một
                niềm vui."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="text-left">
                  <p className="font-semibold text-primary-800">
                    Emily Johnson
                  </p>
                  <p className="text-primary-600">Coffee Enthusiast</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialSection;
