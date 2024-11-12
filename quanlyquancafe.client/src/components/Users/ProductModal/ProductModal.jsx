import React, { useEffect, useState } from "react";
import { Modal } from "flowbite-react";

const ProductModal = ({ product, open, onClose }) => {
  const [modalSize, setModalSize] = useState("sm");
  const [quantity, setQuantity] = useState(1); // Số lượng món

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setModalSize("sm"); // màn hình lg
      } else if (window.innerWidth >= 768) {
        setModalSize("lg"); // màn hình md
      } else {
        setModalSize("xl"); // màn hình sm
      }
    };

    // Gọi ngay lập tức để thiết lập kích thước ban đầu
    handleResize();

    // Lắng nghe sự kiện thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Xóa sự kiện khi component bị unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!product) return null;

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Modal
      size={modalSize}
      dismissible
      show={open}
      onClose={onClose}
      position="top-center"
    >
      <Modal.Header className=" items-center bg-primary-50">
        Thêm món vào giỏ
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="">
          <img
            src={product.image}
            alt={product.alt}
            className="w-full object-cover mb-4 rounded-2xl"
          />
          <span className="font-semibold text-base">{product.name}</span>
          <p className="text-gray-600 text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            aliquam numquam voluptatem, iste exercitationem, vitae ullam earum
            adipisci velit maxime quae dolorem ipsam animi. Sunt ducimus
            assumenda officiis error rerum.
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-base my-2">65.000đ</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className={`text-base rounded-full ${
                  quantity === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary-200"
                }`}
                disabled={quantity === 1}
              >
                <svg
                  className="size-8 text-white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="rounded-full text-xl bg-primary-200"
              >
                <svg
                  className="size-8 text-white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="w-full mt-4">
            <div class="relative">
              <input
                type="text"
                className="focus:border-primary-200 placeholder:text-gray-300 w-full pl-10 pr-3 focus:ring-primary-200"
                placeholder="Ghi chú món ăn..."
              />

              <svg
                class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />{" "}
                <polyline points="14 2 14 8 20 8" />{" "}
                <line x1="16" y1="13" x2="8" y2="13" />{" "}
                <line x1="16" y1="17" x2="8" y2="17" />{" "}
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose}>Đóng</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
