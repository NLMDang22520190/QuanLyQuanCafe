import { useState } from "react";
import { motion } from "framer-motion";
import { TextInput, Label, Button } from "flowbite-react";

const UpdatePersonalData = () => {
  const [formData, setFormData] = useState({
    district: "",
    city: "",
    ward: "",
    customerPoint: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual update logic
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-coffee-800">
              Cập nhật thông tin cá nhân
            </h1>
            <p className="text-coffee-600 mt-2">
              Vui lòng điền đầy đủ thông tin bên dưới
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">Thành phố</Label>
                <TextInput
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Nhập thành phố..."
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">Quận/Huyện</Label>
                <TextInput
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Nhập quận/huyện..."
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ward">Phường/Xã</Label>
                <TextInput
                  id="ward"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  placeholder="Nhập phường/xã..."
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPoint">Điểm tích lũy</Label>
                <TextInput
                  id="customerPoint"
                  name="customerPoint"
                  value={formData.customerPoint}
                  onChange={handleChange}
                  placeholder="Điểm tích lũy..."
                  className="w-full"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email..."
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <TextInput
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại..."
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                color="light"
                className="w-32"
                onClick={() => window.history.back()}
              >
                Hủy
              </Button>
              <Button type="submit" color="dark" className="w-32">
                Cập nhật
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdatePersonalData;
