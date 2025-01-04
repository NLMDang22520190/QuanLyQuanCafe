import React, { useEffect, useState } from "react";
import { Modal, Radio, Button, Checkbox } from "flowbite-react";
import api from "../../../features/AxiosInstance/AxiosInstance";

const ProductModal = ({ product, open, onClose, onAddToCart, cartID }) => {
  const [modalSize, setModalSize] = useState("sm");
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [note, setNote] = useState("");
  const [image, setImage] = useState("https://placehold.co/600x400");

  useEffect(() => {
    if (open) {
      setSelectedToppings([]); // Reset topping khi modal mở
      setQuantity(1); // Reset số lượng khi modal mở
      setNote(""); // Reset ghi chú khi modal mở
    }
  }, [open]);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setModalSize("sm");
      } else if (window.innerWidth >= 768) {
        setModalSize("lg");
      } else {
        setModalSize("xl");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

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

  const handleAddToCart = () => {
    const cartItem = {
      cartId: cartID,
      itemId: product.id,
      quantity,
      notes: "",
      adjustments: "",
    };

    onAddToCart(cartItem);
    onClose();
  };

  // useEffect(() => {
  //   console.log(product.picture);
  //   const fetchImage = async () => {
  //     try {
  //       if (product.picture === "https://placehold.co/600x400") {
  //         return;
  //       }
  //       const imageResponse = await api.get(`api/Image/${product.picture}`, {
  //         responseType: "blob",
  //       });
  //       if (imageResponse.data) {
  //         const imageUrl = URL.createObjectURL(imageResponse.data);
  //         setImage(imageUrl);
  //       } else {
  //         setImage("https://placehold.co/600x400");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setImage("https://placehold.co/600x400");
  //     }
  //   };

  //   fetchImage();
  // }, [product]);

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
      <Modal.Body className="p-0 mb-8">
        <div className="flex flex-col">
          <img
            src={image}
            alt={product.alt}
            className="w-full object-cover rounded-3xl p-4"
          />
          <span className="font-semibold text-base px-4">{product.name}</span>
          <p className="text-gray-600 text-sm mt-2 px-4">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-4 px-4">
            <span className="text-base my-2">{formatPrice(product.price)}</span>
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="rounded-xl w-full text-white"
          gradientDuoTone="redToYellow"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
