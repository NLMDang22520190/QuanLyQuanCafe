import { motion } from "framer-motion";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ subtotal }) => {
  const navigate = useNavigate();

  const onCheckout = () => {
    navigate("/Checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className=""
    >
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Giỏ hàng tổng</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Tạm tính:</span>
            <span className="font-medium">{subtotal}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Phí vận chuyển:</span>
            <span className="text-green-600">Miễn phí</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Thành tiền:</span>
              <span className="font-semibold">{subtotal}</span>
            </div>
          </div>

          <Button
            onClick={() => onCheckout()}
            gradientDuoTone="greenToBlue"
            className="w-full "
          >
            Tiếp tục tới trang thanh toán
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default CartSummary;
