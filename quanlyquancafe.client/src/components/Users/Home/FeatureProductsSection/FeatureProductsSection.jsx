import React from "react";
import HomeItemDisplay from "../../HomeItemDisplay/HomeItemDisplay";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../../features/AxiosInstance/AxiosInstance";
import ProductModal from "../../ProductModal/ProductModal";

const FeatureProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("api/menu-items/FeatureProducts");
        const mappedData = response.data.map((item) => ({
          id: item.itemId,
          name: item.itemName,
          description: item.description,
          price: item.price,
          picture: item.picture || "https://placehold.co/600x400", // Thay thế null bằng hình mặc định nếu cần
        }));
        setProducts(mappedData);
      } catch (error) {
        console.error("Error fetching feature products:", error);
      }
    };

    fetchProducts();
  }, []);

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

      {products.length === 0 ? (
        // Hiển thị thông báo nếu không có sản phẩm
        <div className="text-center text-primary-600 mt-6">
          <p>Thông tin đang được xử lý. Vui lòng chờ trong giây lát...</p>
        </div>
      ) : (
        // Hiển thị danh sách sản phẩm nếu có
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <HomeItemDisplay product={product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default FeatureProductsSection;
