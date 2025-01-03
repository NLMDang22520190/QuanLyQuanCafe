import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { Button, Card, Pagination, Dropdown } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash/debounce";

import {
  fetchCartDetailsByCustomerId,
  deleteItemFromCart,
  updateItemInCart,
} from "../../../features/Cart/Cart";
import CartSummary from "../../../components/Users/CartSummary/CartSummary";

const Cart = () => {
  const [items, setItems] = useState([]);
  const debounceRef = useRef({}); // Lưu trữ các timeout cho từng item

  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchCart = () => {
    dispatch(fetchCartDetailsByCustomerId(userId));
    const mappedItems = cart.items.map((item) => ({
      cartDetailId: item.cartDetailId,
      itemId: item.itemId,
      name: item.item.itemName,
      price: item.item.price,
      quantity: item.quantity,
      image: item.item.picture,
    }));

    //if (JSON.stringify(mappedItems) !== JSON.stringify(items)) {
    setItems(mappedItems); // Cập nhật items chỉ khi có sự khác biệt
    //}
  };

  useEffect(() => {
    if (userId) fetchCart();
    //fetchCart();
  }, [cart.items.length]);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const debouncedUpdate = debounce(async (item, quantity, dispatch) => {
    try {
      await dispatch(
        updateItemInCart({
          cartDetailId: item.cartDetailId,
          quantity,
          notes: "",
          adjustments: "",
        })
      ).unwrap();
      console.log(`Updated quantity for item ${item.cartDetailId}`);
    } catch (error) {
      console.error(`Failed to update quantity`, error);
    }
  }, 300);

  const updateQuantity = (item, change) => {
    const newQuantity = Math.max(1, item.quantity + change);

    // Cập nhật UI ngay lập tức
    setItems((prevItems) =>
      prevItems.map((currentItem) =>
        currentItem.cartDetailId === item.cartDetailId
          ? { ...currentItem, quantity: newQuantity }
          : currentItem
      )
    );

    // Debounce API call
    debouncedUpdate(item, newQuantity, dispatch);
  };

  const removeItem = (id) => {
    console.log("Removing item with ID:", id);
    dispatch(deleteItemFromCart(id));
    // setItems((prevItems) =>
    //   prevItems.filter((item) => item.cartDetailId !== id)
    // );
    fetchCart();
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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

              {items && items.length > 0 ? (
                paginatedItems.map((item, index) => (
                  <>
                    <motion.div
                      key={item.cartDetailId}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-b-0"
                    >
                      <div className="col-span-6 flex items-center gap-4">
                        <img
                          src={item.image || "placeholder.png"} // Use a placeholder if no image
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <span className="font-medium">
                          {item.name || "Unknown Product"}
                        </span>
                      </div>
                      <div className="col-span-2 text-center">
                        {formatPrice(item.price || 0)}
                      </div>
                      <div className="col-span-2 flex items-center justify-center gap-2">
                        <Button
                          gradientDuoTone="redToYellow"
                          size="icon"
                          disabled={item.quantity === 1}
                          onClick={() => updateQuantity(item, -1)}
                        >
                          <Minus className="h-4 w-4 text-white" />
                        </Button>
                        <span className="w-8 text-center">
                          {item.quantity || 1}
                        </span>
                        <Button
                          gradientDuoTone="redToYellow"
                          size="icon"
                          onClick={() => updateQuantity(item, 1)}
                        >
                          <Plus className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                      <div className="col-span-2 flex items-center justify-between">
                        <span className="font-medium">
                          {formatPrice(
                            (item.price || 0) * (item.quantity || 1)
                          )}
                        </span>
                        <Button
                          gradientDuoTone="pinkToOrange"
                          size="icon"
                          onClick={() => removeItem(item.cartDetailId)}
                        >
                          <X className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </motion.div>
                  </>
                ))
              ) : (
                <p className="text-center py-4">
                  Chưa có sản phẩm trong giỏ hàng
                </p>
              )}
              <div className="flex justify-between items-center mt-4">
                <Dropdown
                  outline
                  color="teal"
                  label={`Hiển thị ${itemsPerPage} mục`}
                  onSelect={(e) =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                >
                  {[5, 10, 20, 50].map((size) => (
                    <Dropdown.Item
                      key={size}
                      onClick={() => handleItemsPerPageChange(size)}
                    >
                      {size} mục/trang
                    </Dropdown.Item>
                  ))}
                </Dropdown>
                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  totalPages={Math.ceil(items.length / itemsPerPage)}
                />
              </div>
            </Card>
          </div>

          <CartSummary subtotal={formatPrice(subtotal)} />
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
