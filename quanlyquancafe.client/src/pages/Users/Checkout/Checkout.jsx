import { useState } from "react";
import { motion } from "framer-motion";
import { Label, TextInput, Select, Button, Card, Radio } from "flowbite-react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    province: "",
    district: "",
    detailAddress: "",
    paymentMethod: "cash",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-cream min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-2xl text-primary-300 font-semibold mb-6">
                    Thông Tin Thanh Toán
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" value="Họ và Tên" />
                      <TextInput
                        id="fullName"
                        name="fullName"
                        placeholder="Nhập họ và tên"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" value="Email" />
                      <TextInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Nhập địa chỉ email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" value="Số Điện Thoại" />
                      <TextInput
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor="country" value="Quốc Gia / Khu Vực" />
                      <Select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="">Chọn</option>
                        <option value="vietnam">Việt Nam</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="province" value="Tỉnh / Thành Phố" />
                      <Select
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                      >
                        <option value="">Chọn</option>
                        <option value="hanoi">Hà Nội</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="district" value="Quận / Huyện" />
                      <Select
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                      >
                        <option value="">Chọn</option>
                        <option value="district1">Quận 1</option>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="detailAddress" value="Địa Chỉ Cụ Thể" />
                    <TextInput
                      id="detailAddress"
                      name="detailAddress"
                      placeholder="Nhập địa chỉ cụ thể"
                      value={formData.detailAddress}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl text-primary-300 font-semibold mb-6">
                    Phương Thức Thanh Toán
                  </h2>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Radio
                        id="cash"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={handleChange}
                      />
                      <Label htmlFor="cash">Thanh Toán Khi Nhận Hàng</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio
                        id="banking"
                        name="paymentMethod"
                        value="banking"
                        checked={formData.paymentMethod === "banking"}
                        onChange={handleChange}
                      />
                      <Label htmlFor="banking">Chuyển Khoản Ngân Hàng</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio
                        id="momo"
                        name="paymentMethod"
                        value="momo"
                        checked={formData.paymentMethod === "momo"}
                        onChange={handleChange}
                      />
                      <Label htmlFor="momo">Momo</Label>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  Đặt Hàng
                </Button>
              </form>
            </Card>
          </div>

          <div>
            <Card>
              <h2 className="text-xl text-primary-300 font-semibold mb-6">
                Tóm Tắt Đơn Hàng
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src="/lovable-uploads/cdecdfaa-caed-4077-a683-52201482dab8.png"
                      alt="Green Capsicum"
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>Ớt Xanh x5</span>
                  </div>
                  <span className="font-medium">70.000₫</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src="/lovable-uploads/301b9576-bb0c-4289-b17d-1bc81bbfad35.png"
                      alt="Red Capsicum"
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>Ớt Đỏ x1</span>
                  </div>
                  <span className="font-medium">14.000₫</span>
                </div>
                <div className="border-t pt-4 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tạm Tính:</span>
                    <span className="font-medium">84.000₫</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-muted-foreground">
                      Phí Vận Chuyển:
                    </span>
                    <span className="text-green-600">Miễn Phí</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-muted-foreground">Mã giảm giá:</span>
                    <span className="font-light">SUMMERTIME2024</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-muted-foreground">Giảm:</span>
                    <span className="font-medium">-24.000đ</span>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-lg font-semibold">
                    <span>Tổng Cộng:</span>
                    <span>84.000₫</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;
