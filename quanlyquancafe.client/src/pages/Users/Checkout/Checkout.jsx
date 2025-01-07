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
import { message } from "antd";

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

  const [items, setItems] = useState([]);

  // Improved fetchCart function
  const fetchCart = () => {
    if (!cart.items || cart.items.length === 0) {
      setItems([]); // Handle empty cart
      return;
    }

    const mappedItems = cart.items.map((item) => ({
      cartDetailId: item.cartDetailId,
      itemId: item.itemId,
      name: item.item?.itemName || "Unnamed Item", // Fallback if itemName is missing
      price: item.item?.price || 0, // Fallback to 0 if price is missing
      quantity: item.quantity || 0, // Ensure there's always a quantity value
      image: item.item?.picture || "/default-image.jpg", // Provide a default image if missing
    }));

    setItems(mappedItems); // Update items
  };

  useEffect(() => {
    fetchCart();
  }, [cart.items]);

  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + (item.price * item.quantity || 0), // Ensure quantity defaults to 0
    0
  );

  // Voucher state
  const [isVoucherInputVisible, setIsVoucherInputVisible] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherError, setVoucherError] = useState(""); // To store voucher validation error
  const [voucherDiscount, setVoucherDiscount] = useState(0); // Discount from valid voucher
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleVoucherClick = () => {
    setIsVoucherInputVisible(true); // Show the input box for voucher code
  };

  const handleVoucherSubmit = async () => {
    // Check if the user has entered a voucher code
    if (!voucherCode) {
      setVoucherError("Vui lòng nhập mã giảm giá.");
      return;
    }

    try {
      // Fetch voucher data from the API
      const response = await api.get(
        `/api/Voucher/GetVoucherByCustomerId/${userId}`
      );

      // Check if the response and data exist
      if (!response || !response.data) {
        setVoucherError("Không nhận được dữ liệu từ máy chủ.");
        setVoucherDiscount(0);
        return;
      }

      const data = response.data;

      // Debugging the response data
      console.log("API Response Data:", data);

      // Ensure the data is an array and contains voucher details
      if (Array.isArray(data)) {
        // Find the matching voucher by voucherCode
        const voucher = data.find((v) => v.voucherCode === voucherCode);

        if (voucher) {
          // Check if the voucher is still valid
          const currentDate = new Date();
          const voucherEnd = new Date(voucher.voucherEndDate);

          if (voucherEnd >= currentDate) {
            // Apply the discount and clear any previous errors
            setVoucherDiscount(voucher.percentDiscount);
            setVoucherError("");
            setSelectedVoucher(voucher);
          } else {
            setVoucherError("Mã giảm giá đã hết hạn.");
            setVoucherDiscount(0);
            setSelectedVoucher(null);
          }
        } else {
          // If no matching voucher was found
          setVoucherError("Mã giảm giá không hợp lệ.");
          setVoucherDiscount(0);
          setSelectedVoucher(null);
        }
      } else {
        // If the response data is not in the expected format
        setVoucherError("Dữ liệu phản hồi không hợp lệ.");
        setVoucherDiscount(0);
        setSelectedVoucher(null);
      }
    } catch (error) {
      console.error("Error fetching voucher:", error);

      // Handle any errors during the API call
      setVoucherError("Lỗi khi kiểm tra mã giảm giá. Vui lòng thử lại.");
      setVoucherDiscount(0);
      setSelectedVoucher(null);
    }
  };

  // Format price to VND
  const formatPrice = (price) => {
    if (price === 0) return "Liên hệ"; // In case price is zero, return "Contact"
    return price.toLocaleString("vi-VN") + "đ";
  };

  const DiscountCodeSection = ({ userId, totalPrice }) => {
    const [isVoucherInputVisible, setIsVoucherInputVisible] = useState(false);
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherError, setVoucherError] = useState(""); // To store voucher validation error
    const [voucherDiscount, setVoucherDiscount] = useState(0); // Discount from valid voucher

    // Toggle voucher input visibility
    const handleVoucherClick = () => {
      setIsVoucherInputVisible(true); // Show the input box for voucher code
    };

    // Handle the voucher submission and API validation
    const handleVoucherSubmit = async () => {
      if (!voucherCode) {
        setVoucherError("Vui lòng nhập mã giảm giá.");
        return;
      }

      try {
        const response = await fetch(
          `/api/Voucher/GetVoucherByCustomerId/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data && data.isValid && data.discountAmount) {
          setVoucherDiscount(data.discountAmount);
          setVoucherError(""); // Clear any previous errors
        } else {
          setVoucherError("Mã giảm giá không hợp lệ.");
          setVoucherDiscount(0);
        }
      } catch (error) {
        console.error("Error fetching voucher:", error);
        setVoucherError("Lỗi khi kiểm tra mã giảm giá.");
      }
    };
  };

  // Calculate the total price after applying the discount
  const totalPriceAfterDiscount =
    totalPrice - totalPrice * (voucherDiscount / 100);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các giá trị bắt buộc
    if (!selectedCity || !selectedDistrict || !selectedWard) {
      message.warning("Vui lòng chọn đầy đủ Thành phố, Quận và Phường.");
      return;
    }

    if (!formData.phoneNumber.match(/^(\+84|0)[1-9][0-9]{8}$/)) {
      message.warning("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
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
      voucherApplied:
        selectedVoucher != null ? selectedVoucher.voucherId : null,
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
        message.success("Đặt hàng thành công!");
        dispatch(fetchCartDetailsByCustomerId(userId)); // Cập nhật giỏ hàng
        if (cart.status === "succeeded") {
          navigate("/"); // Chuyển hướng người dùng đến trang thành công
        }
      } else {
        throw new Error("Đặt hàng thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      message.error("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
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
                {/* Loop through cart items dynamically */}
                {items.map((item) => (
                  <div
                    key={item.cartDetailId}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image || "/default-image.jpg"} // Fallback image
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span>{`${item.name} x${item.quantity}`}</span>
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-4 flex flex-col gap-4">
                  {/* Tạm Tính */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tạm Tính:</span>
                    <span className="font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {/* Shipping fee */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-muted-foreground">
                      Phí Vận Chuyển:
                    </span>
                    <span className="text-green-600">Miễn Phí</span>
                  </div>

                  {/* Discount code */}
                  <div className="voucher-section">
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground">
                        Mã giảm giá:
                      </span>

                      {voucherDiscount > 0 ? (
                        // Show the applied voucher code if a valid discount exists
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-medium">
                            {voucherCode} (−{voucherDiscount}%)
                          </span>
                          <button
                            onClick={() => {
                              setVoucherCode(""); // Reset voucher code
                              setVoucherDiscount(0); // Reset discount
                              setIsVoucherInputVisible(false); // Show "Áp dụng mã giảm giá"
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : isVoucherInputVisible ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Nhập mã giảm giá"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            className="w-32 p-2 border rounded"
                          />
                          <button
                            onClick={handleVoucherSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                          >
                            Áp Dụng
                          </button>
                        </div>
                      ) : (
                        <span
                          className="font-light text-red-500 cursor-pointer"
                          onClick={() => setIsVoucherInputVisible(true)}
                        >
                          Áp dụng mã giảm giá
                        </span>
                      )}
                    </div>

                    {/* Show error message if voucher is invalid */}
                    {voucherError && (
                      <div className="text-red-500 text-sm mt-2">
                        {voucherError}
                      </div>
                    )}

                    {/* Show applied discount if valid */}
                    {voucherDiscount > 0 && (
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-muted-foreground">Giảm:</span>
                        <span className="font-medium">
                          {formatPrice((totalPrice * voucherDiscount) / 100)}
                        </span>
                      </div>
                    )}

                    {/* Show the total price after discount */}
                    <div className="flex justify-between items-center mt-4 text-lg font-semibold">
                      <span>Tổng Cộng:</span>
                      <span>{formatPrice(totalPriceAfterDiscount)}</span>{" "}
                    </div>
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
