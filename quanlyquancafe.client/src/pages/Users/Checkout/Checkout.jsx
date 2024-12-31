import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Label,
  TextInput,
  Select,
  Button,
  Card,
  Radio,
  Dropdown,
} from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../../../features/AxiosInstance/AxiosInstance";
import { fetchCartDetailsByCustomerId } from "../../../features/Cart/Cart";

const apiKey = "a84f0896-7c1a-11ef-8e53-0a00184fe694";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    city: "",
    district: "",
    ward: "",
    detailAddress: "",
    paymentMethod: "cash",
  });

  const [email, setEmail] = useState("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // flag to track if data is loaded

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const userId = auth.user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.user || !auth.isAuthenticated) {
      navigate("/auth/login");
    }
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`api/account/GetUserById/${userId}`);
        const userData = response.data;

        // Điền thông tin người dùng vào formData
        setFormData({
          name: userData.fullName || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          city:
            userData.city && userData.city !== "string" ? userData.city : "",
          district:
            userData.district && userData.district !== "string"
              ? userData.district
              : "",
          ward:
            userData.ward && userData.ward !== "string" ? userData.ward : "",
        });

        setEmail(userData.email);

        // Chờ một thời gian trước khi setIsDataLoaded
        setTimeout(() => {
          setIsDataLoaded(true);
        }, 150); // Chờ 200ms (bạn có thể thay đổi thời gian này)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Token: apiKey,
            },
          }
        );
        const data = await response.json();

        if (data && data.data) {
          setCities(data.data);
        } else {
          console.error("No cities data found:", data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  // Fetch districts when city changes or if city has existing data
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Token: apiKey,
            },
            body: JSON.stringify({ province_id: selectedCity }),
          }
        );
        const data = await response.json();

        if (data && data.data) {
          setDistricts(data.data);

          if (
            formData.district &&
            data.data.some((d) => d.DistrictID === formData.district)
          ) {
            setSelectedDistrict(formData.district);
          } else {
            setSelectedDistrict("");
          }
        } else {
          console.error("No districts data found:", data);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    if (selectedCity) {
      fetchDistricts();
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedCity, formData.district]);

  // Fetch wards when district changes or if district has existing data
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await fetch(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Token: apiKey,
            },
            body: JSON.stringify({ district_id: selectedDistrict }),
          }
        );
        const data = await response.json();

        if (data && data.data) {
          setWards(data.data);

          if (
            formData.ward &&
            data.data.some((w) => w.WardCode === formData.ward)
          ) {
            setSelectedWard(formData.ward);
          } else {
            setSelectedWard("");
          }
        } else {
          console.error("No wards data found:", data);
        }
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };

    if (selectedDistrict) {
      fetchWards();
    } else {
      setWards([]);
      setSelectedWard("");
    }
  }, [selectedDistrict, formData.ward]);

  // Sync formData with selected address values
  useEffect(() => {
    if (cities.length > 0) {
      if (formData.city) setSelectedCity(parseInt(formData.city));
      if (formData.district) setSelectedDistrict(parseInt(formData.district));
      if (formData.ward) setSelectedWard(parseInt(formData.ward));
    }
  }, [cities, isDataLoaded, formData.ward]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các giá trị bắt buộc
    if (!selectedCity || !selectedDistrict || !selectedWard) {
      alert("Vui lòng chọn đầy đủ Thành phố, Quận và Phường.");
      return;
    }

    if (!formData.phoneNumber.match(/^(\+84|0)[1-9][0-9]{8}$/)) {
      alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    // Gộp địa chỉ
    const cityName =
      cities.find((city) => city.ProvinceID === selectedCity)?.ProvinceName ||
      "";
    const districtName =
      districts.find((district) => district.DistrictID === selectedDistrict)
        ?.DistrictName || "";
    const wardName =
      wards.find((ward) => ward.WardCode === selectedWard)?.WardName || "";
    const fullAddress = `${cityName}, ${districtName}, ${wardName}, ${formData.detailAddress}`;

    // Chuẩn bị dữ liệu cho API
    const orderData = {
      userId: userId,
      voucherApplied: 0, // Hiện tại để trống
      paymentMethod: formData.paymentMethod,
      fullName: formData.name,
      phoneNumber: formData.phoneNumber,
      address: fullAddress,
    };

    console.log(orderData);

    try {
      setIsLoading(true);

      // Gọi API đặt hàng
      const response = await api.post(
        "https://localhost:7087/api/Order/CreateNewOrder",
        orderData
      );

      if (response.status === 200 || response.status === 201) {
        alert("Đặt hàng thành công!");
        dispatch(fetchCartDetailsByCustomerId(userId)); // Cập nhật giỏ hàng
        if (cart.status === "succeeded") {
          navigate("/Cart"); // Chuyển hướng người dùng đến trang thành công
        }
      } else {
        throw new Error("Đặt hàng thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
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
                      <Label htmlFor="fullName" value="Họ và Tên người nhận" />
                      <TextInput
                        required
                        id="fullName"
                        name="fullName"
                        placeholder="Nhập họ và tên"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" value="Số điện thoại người nhận" />
                      <TextInput
                        required
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label className="text-gray-700">Thành Phố</Label>
                      <Dropdown
                        size="md"
                        color="teal"
                        className="h-64 overflow-auto"
                        label={
                          selectedCity
                            ? cities.find(
                                (city) => city.ProvinceID === selectedCity
                              )?.ProvinceName
                            : "Chọn Thành Phố"
                        }
                      >
                        {cities.map((city) => (
                          <Dropdown.Item
                            key={city.ProvinceID}
                            onClick={() => setSelectedCity(city.ProvinceID)}
                          >
                            {city.ProvinceName}
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
                    </div>
                    <div>
                      <Label className="text-gray-700">Quận</Label>
                      <Dropdown
                        size="md"
                        className="h-64 overflow-auto"
                        color="teal"
                        label={
                          selectedDistrict
                            ? districts.find(
                                (district) =>
                                  district.DistrictID === selectedDistrict
                              )?.DistrictName
                            : "Chọn Quận"
                        }
                        disabled={!selectedCity}
                      >
                        {districts.map((district) => (
                          <Dropdown.Item
                            key={district.DistrictID}
                            onClick={() =>
                              setSelectedDistrict(district.DistrictID)
                            }
                          >
                            {district.DistrictName}
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
                    </div>
                    <div>
                      <Label className="text-gray-700">Phường</Label>
                      <Dropdown
                        size="md"
                        color="teal"
                        className="h-64 overflow-auto"
                        label={
                          selectedWard
                            ? wards.find(
                                (ward) => ward.WardCode === selectedWard
                              )?.WardName
                            : "Chọn Phường"
                        }
                        disabled={!selectedDistrict}
                      >
                        {wards.map((ward) => (
                          <Dropdown.Item
                            key={ward.WardCode}
                            onClick={() => setSelectedWard(ward.WardCode)}
                          >
                            {ward.WardName}
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
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
                  gradientDuoTone="greenToBlue"
                  type="submit"
                  isProcessing={isLoading}
                  disabled={isLoading}
                  className="w-full "
                >
                  {isLoading ? "Đang xử lý..." : "Đặt Hàng"}
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
