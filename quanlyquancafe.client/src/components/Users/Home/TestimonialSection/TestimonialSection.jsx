import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TestimonialSection = () => {
  const auth = useSelector((state) => state.auth);

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
            <Link
              to="/MenuAll"
              className="transition-all duration-300 ease-out hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 bg-primary-600 text-white px-8 py-3 rounded-lg font-medium"
            >
              Đặt hàng
            </Link>
            {!auth.isAuthenticated && (
              <Link
                to="/auth/login"
                className={`transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 bg-white text-primary-800 px-8 py-3 rounded-lg font-medium border border-primary-200`}
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default TestimonialSection;
