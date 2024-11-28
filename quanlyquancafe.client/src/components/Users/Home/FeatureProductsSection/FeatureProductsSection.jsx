import React from "react";
import HomeItemDisplay from "../../HomeItemDisplay/HomeItemDisplay";
import { motion } from "framer-motion";

const FeatureProductsSection = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-4"
      >
        <h2 className="text-4xl font-bold text-primary-800 mb-6">
          Sản Phẩm Nổi Bật
        </h2>
        <p className="text-lg text-primary-600">
          Khám phá những lựa chọn cà phê phổ biến nhất của chúng tôi.
        </p>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
        <HomeItemDisplay />
      </div>
    </>
  );
};

export default FeatureProductsSection;
