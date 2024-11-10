import React from "react";
import MenuItemTypeDisplay from "../../../components/Users/MenuItemTypeDisplay/MenuItemTypeDisplay";

const Menu = () => {
  const categories = [
    {
      name: "Món Mới Phải Thử",
      image: "https://placehold.co/100x100",
      alt: "Món Mới Phải Thử",
    },
    {
      name: "Trái Cây Xay 0°C",
      image: "https://placehold.co/100x100",
      alt: "Trái Cây Xay 0°C",
    },
    {
      name: "Trà Trái Cây - HiTea",
      image: "https://placehold.co/100x100",
      alt: "Trà Trái Cây - HiTea",
    },
    {
      name: "Trà Sữa",
      image: "https://placehold.co/100x100",
      alt: "Trà Sữa",
      active: true,
    },
    {
      name: "Trà Xanh - Chocolate",
      image: "https://placehold.co/100x100",
      alt: "Trà Xanh - Chocolate",
    },
    {
      name: "Đá Xay Frosty",
      image: "https://placehold.co/100x100",
      alt: "Đá Xay Frosty",
    },
    { name: "Cà Phê", image: "https://placehold.co/100x100", alt: "Cà Phê" },
    { name: "Cơm Nhà", image: "https://placehold.co/100x100", alt: "Cơm Nhà" },
    {
      name: "Bánh Mặn",
      image: "https://placehold.co/100x100",
      alt: "Bánh Mặn",
    },
    {
      name: "Món Nóng",
      image: "https://placehold.co/100x100",
      alt: "Món Nóng",
    },
    {
      name: "Bánh Ngọt",
      image: "https://placehold.co/100x100",
      alt: "Bánh Ngọt",
    },
    { name: "Topping", image: "https://placehold.co/100x100", alt: "Topping" },
    {
      name: "Cà Phê - Trà Đóng Gói",
      image: "https://placehold.co/100x100",
      alt: "Cà Phê - Trà Đóng Gói",
    },
  ];

  const products = [
    {
      name: "Trà sữa Oolong Nướng (Nóng)",
      price: "55.000đ",
      image: "https://placehold.co/100x100",
      alt: "Trà sữa Oolong Nướng (Nóng)",
    },
    {
      name: "Hồng Trà Sữa Nóng",
      price: "55.000đ",
      image: "https://placehold.co/100x100",
      alt: "Hồng Trà Sữa Nóng",
    },
    {
      name: "Trà Sữa Oolong Tứ Quý Bơ",
      price: "59.000đ",
      image: "https://placehold.co/100x100",
      alt: "Trà Sữa Oolong Tứ Quý Bơ",
    },
    {
      name: "Trà Sữa Oolong BLoa",
      price: "39.000đ",
      image: "https://placehold.co/100x100",
      alt: "Trà Sữa Oolong BLoa",
    },
    {
      name: "Trà Sữa Oolong Nướng Sương Sáo",
      price: "55.000đ",
      image: "https://placehold.co/100x100",
      alt: "Trà Sữa Oolong Nướng Sương Sáo",
    },
    {
      name: "Trà sữa Oolong Nướng Trân Châu",
      price: "55.000đ",
      image: "https://placehold.co/100x100",
      alt: "Trà sữa Oolong Nướng Trân Châu",
      bestSeller: true,
    },
  ];
  return (
    <div className="container px-8 mx-auto">
      <h1 className="flex justify-center  items-center gap-3 text-3xl font-bold text-center my-12">
        <div className="rounded-full bg-primary-50 border-black p-4 font-semibold transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-full hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
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
        {categories.map((category, index) => (
          <MenuItemTypeDisplay key={index} category={category} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-white shadow-md relative"
          >
            {product.bestSeller && (
              <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1">
                BEST SELLER
              </div>
            )}
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-orange-500 font-bold mb-2">{product.price}</p>
            <button className="absolute bottom-4 right-4 bg-orange-500 text-white rounded-full p-2">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
