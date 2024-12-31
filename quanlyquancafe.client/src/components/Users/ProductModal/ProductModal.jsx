import React, { useEffect, useState } from "react";
import { Modal, Radio, Button, Checkbox } from "flowbite-react";

const ProductModal = ({ product, open, onClose, onAddToCart, cartID }) => {
  const [modalSize, setModalSize] = useState("sm");
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      setSelectedToppings([]); // Reset topping khi modal mở
      setQuantity(1); // Reset số lượng khi modal mở
      setNote(""); // Reset ghi chú khi modal mở
    }
  }, [open]);

  const sizeOptions = [
    { id: "size-small", label: "Nhỏ", price: "+ 0đ" },
    { id: "size-medium", label: "Vừa", price: "+ 4.000đ" },
    { id: "size-large", label: "Lớn", price: "+ 10.000đ" },
  ];

  const toppingOptions = [
    { id: "topping-cream", label: "Thêm kem", price: "+ 5.000đ" },
    { id: "topping-boba", label: "Trân châu", price: "+ 10.000đ" },
    { id: "topping-almond", label: "Hạnh nhân", price: "+ 7.000đ" },
  ];

  const handleToppingChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedToppings((prev) => [...prev, id]);
    } else {
      setSelectedToppings((prev) => prev.filter((topping) => topping !== id));
    }
  };

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
            src={product.picture}
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
