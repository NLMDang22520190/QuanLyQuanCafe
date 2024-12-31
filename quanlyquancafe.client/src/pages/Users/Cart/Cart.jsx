import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { Button, Card } from "flowbite-react";
import { useSelector } from "react-redux";

import CartSummary from "../../../components/Users/CartSummary/CartSummary";

const initialItems = [
  {
    id: "1",
    name: "Green Capsicum",
    price: 14.0,
    quantity: 5,
    image: "/lovable-uploads/cdecdfaa-caed-4077-a683-52201482dab8.png",
  },
  {
    id: "2",
    name: "Red Capsicum",
    price: 14.0,
    quantity: 5,
    image: "/lovable-uploads/301b9576-bb0c-4289-b17d-1bc81bbfad35.png",
  },
];

const Cart = () => {
  const [items, setItems] = useState([]);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setItems(
      cart.items.map((item) => ({
        id: item.itemId,
        name: item.item.itemName,
        price: item.item.price,
        quantity: item.quantity,
        image: item.item.picture,
      }))
    );
    console.log(items);
  }, [cart.items]);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const updateQuantity = (id, change) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-cream min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8 "
      >
        <h1 className="text-3xl font-bold mb-8 text-primary-300">
          Giỏ hàng của tôi
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-lg shadow">
              <div className="grid grid-cols-12 gap-4 p-4 text-sm text-muted-foreground border-b">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-center">Tạm tính</div>
              </div>

              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-b-0"
                >
                  <div className="col-span-6 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="col-span-2 text-center">
                    {formatPrice(item.price)}
                  </div>
                  <div className="col-span-2 flex items-center justify-center gap-2">
                    <Button
                      gradientDuoTone="redToYellow"
                      size="icon"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4 text-white" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      gradientDuoTone="redToYellow"
                      size="icon"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <div className="col-span-2 flex items-center justify-between">
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <Button
                      gradientDuoTone="pinkToOrange"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </Card>
          </div>

          <CartSummary subtotal={formatPrice(subtotal)} />
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
