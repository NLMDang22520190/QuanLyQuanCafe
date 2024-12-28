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
    const sizeSelection = document.querySelector(
      'input[name="size"]:checked'
    )?.id;
    const selectedSize = sizeOptions.find((size) => size.id === sizeSelection);

    const selectedToppingsDetails = selectedToppings.map((toppingId) => {
      const topping = toppingOptions.find((t) => t.id === toppingId);
      return { label: topping.label, price: topping.price };
    });

    const adjustments = {
      size: selectedSize
        ? { label: selectedSize.label, price: selectedSize.price }
        : { label: "Nhỏ", price: "+ 0đ" },
      toppings:
        selectedToppingsDetails.length > 0
          ? selectedToppingsDetails
          : "Không có",
    };

    const cartItem = {
      cartId: cartID,
      itemId: product.id,
      quantity,
      notes: note,
      adjustments: JSON.stringify(adjustments),
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
      <Modal.Body className="p-0">
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

          <div className="w-full mt-4 px-4">
            <div className="relative">
              <input
                type="text"
                className="focus:border-primary-200 placeholder:text-gray-300 w-full pl-10 pr-3 focus:ring-primary-200"
                placeholder="Ghi chú món ăn..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <svg
                className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
          </div>

          <div className="h-12 bg-gray-200 items-center flex my-4">
            <span className="text-justify text-sm text-gray-800 pl-4">
              Chọn size (Bắt buộc)
            </span>
          </div>

          <div className="flex px-4 justify-between">
            {sizeOptions.map((size) => (
              <div key={size.id} className="flex items-center">
                <Radio
                  name="size"
                  id={size.id}
                  className="mr-2 border-2 border-gray-200 size-5 focus:ring-primary-200 focus:bg-primary-200 checked:bg-primary-200"
                />
                <label htmlFor={size.id} className="flex-1 text-gray-700">
                  {size.label}
                  <span className="inline-block w-full">{size.price}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="h-12 bg-gray-200 items-center flex my-4">
            <span className="text-justify text-sm text-gray-800 pl-4">
              Chọn topping (Tuỳ chọn)
            </span>
          </div>
          <div className="flex px-4 justify-between mb-8">
            {toppingOptions.map((topping) => (
              <div key={topping.id} className="flex items-center">
                <Checkbox
                  type="checkbox"
                  name="topping"
                  onChange={handleToppingChange}
                  id={topping.id}
                  className="mr-2 border-2 border-gray-200 size-5 focus:ring-primary-200"
                />
                <label htmlFor={topping.id} className="flex-1 text-gray-700">
                  {topping.label}
                  <span className="inline-block w-full">{topping.price}</span>
                </label>
              </div>
            ))}
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
