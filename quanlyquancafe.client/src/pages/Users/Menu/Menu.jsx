import React from "react";
import MenuItemTypeDisplay from "../../../components/Users/MenuItemTypeDisplay/MenuItemTypeDisplay";
import MenuItemDisplay from "../../../components/Users/MenuItemDisplay/MenuItemDisplay";
import ProductModal from "../../../components/Users/ProductModal/ProductModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../features/AxiosInstance/AxiosInstance";
import { addItemToCart } from "../../../features/Cart/Cart";
import { message } from "antd";

const Menu = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]); // Danh sách sản phẩm theo loại món ăn
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("api/food-types");
        const mappedData = response.data.map((item) => ({
          id: item.typeOfFoodId, // Giả sử API trả về thuộc tính 'id'
          name: item.typeOfFoodName, // Giả sử API trả về thuộc tính 'name'
          image: item.picture || "https://placehold.co/100x100", // Giả sử API trả về thuộc tính 'image'
        }));
        setCategories(mappedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Chỉ gọi một lần khi component mount

  // Fetch products by categoryId
  const fetchProductsByCategoryId = async (categoryId) => {
    try {
      const response = await api.get(
        `api/menu-items/GetProdByCategoryId/${categoryId}`
      );
      const mappedData = response.data.map((item) => ({
        id: item.itemId,
        name: item.itemName,
        description: item.description,
        price: item.price,
        picture: item.picture || "https://placehold.co/600x400", // Thay thế null bằng hình mặc định nếu cần
      }));
      setCategoryProducts(mappedData); // Cập nhật danh sách sản phẩm
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId); // Đặt loại món ăn được chọn
    fetchProductsByCategoryId(categoryId);
  };

  const handleProductClick = (product) => {
    if (!auth.isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    setSelectedProduct(product);
    setOpenModal(true);
  };

  const onAddToCart = async (item) => {
    dispatch(addItemToCart(item)); // Thêm sản phẩm vào giỏ hàng
    if (cart.status === "succeeded") {
      message.success("Sản phẩm đã được thêm vào giỏ hàng!");
    } else if (cart.status === "failed") {
      message.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng!");
    }
  };

  return (
    <div className=" min-h-screen  bg-cream ">
      <main className="container px-8 py-16 mx-auto ">
        <h1 className="flex justify-center items-center gap-3 text-3xl font-bold text-center mb-12">
          <div className="p-4 rounded-full font-semibold border-black bg-primary-50 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
            <svg
              className="text-primary-700"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />{" "}
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />{" "}
              <line x1="6" y1="1" x2="6" y2="4" />{" "}
              <line x1="10" y1="1" x2="10" y2="4" />{" "}
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </div>

          <span className="text-primary-300">Sản phẩm</span>
        </h1>
        <div className="flex overflow-x-auto md:flex-wrap justify-stretch md:justify-center space-x-6 mb-8">
          {categories.length === 0 ? (
            // Hiển thị thông báo nếu không có sản phẩm
            <div className="text-center text-primary-600 mt-6">
              <p>Thông tin đang được xử lý. Vui lòng chờ trong giây lát...</p>
            </div>
          ) : (
            categories.map((category, index) => (
              <MenuItemTypeDisplay
                onClick={() => handleCategoryClick(category.id)}
                key={index}
                category={category}
                isActive={activeCategoryId === category.id} // So sánh ID để xác định trạng thái
              />
            ))
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoryProducts.length === 0 ? (
            // Hiển thị thông báo nếu không có sản phẩm
            <div className="text-center col-span-6  text-primary-600 mt-6">
              <p>Thông tin đang được xử lý. Vui lòng chờ trong giây lát...</p>
            </div>
          ) : (
            categoryProducts.map((product, index) => (
              <MenuItemDisplay
                key={index}
                product={product}
                onClick={() => handleProductClick(product)} // Mở modal khi chọn sản phẩm
              />
            ))
          )}
        </div>
        {/* Sử dụng ProductModal */}
      </main>
      <ProductModal
        product={selectedProduct}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddToCart={onAddToCart}
        cartID={cart.cartId}
      />
    </div>
  );
};

export default Menu;
