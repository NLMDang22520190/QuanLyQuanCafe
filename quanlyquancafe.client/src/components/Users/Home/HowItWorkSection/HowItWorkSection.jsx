import React from "react";
import { motion } from "framer-motion";

const HowItWorkSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-4">
          Đặt Cà Phê Online Thật Dễ Dàng
        </h2>
        <p className="text-lg text-primary-600 max-w-2xl mx-auto">
          Tại Rise and Drink, chúng tôi mang đến trải nghiệm mua cà phê đơn giản
          nhất. Từ việc chọn lựa hương vị yêu thích đến giao tận cửa, mọi thứ
          đều thật dễ dàng.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <svg
              class="size-12 text-primary-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />{" "}
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />{" "}
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />{" "}
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-primary-800 mb-3">
            Chọn Sản Phẩm Cà Phê Yêu Thích
          </h3>
          <p className="text-primary-600">
            Khám phá bộ sưu tập cà phê hảo hạng phong phú của chúng tôi.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <svg
              class="size-12 text-primary-600"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <circle cx="9" cy="19" r="2" /> <circle cx="17" cy="19" r="2" />{" "}
              <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-primary-800 mb-3">
            Quy Trình Thanh Toán Đơn Giản
          </h3>
          <p className="text-primary-600">
            Hoàn tất đơn hàng chỉ với vài thao tác.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <svg
              class="size-12 text-primary-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <rect x="1" y="3" width="15" height="13" />{" "}
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />{" "}
              <circle cx="5.5" cy="18.5" r="2.5" />{" "}
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-primary-800 mb-3">
            Giao Hàng Nhanh Chóng và Tin Cậy
          </h3>
          <p className="text-primary-600">
            Thưởng thức cà phê tươi ngon được giao tận nơi.
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-6 justify-center"
      >
        <button className="transition-all duration-300 ease-out hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5 bg-primary-500 text-white px-8 py-3 rounded-lg font-medium">
          Đặt hàng
        </button>
      </motion.div>
    </div>
  );
};

export default HowItWorkSection;
