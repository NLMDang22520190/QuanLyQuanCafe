import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TextInput as Input,
  Label,
  Button,
  Datepicker,
  Dropdown,
} from "flowbite-react";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../../features/AxiosInstance/AxiosInstance";
import ChangePasswordCard from "../../../components/Users/ChangePasswordCard/ChangePasswordCard";
import { logout } from "../../../features/Auth/Auth";
import { clearCart } from "../../../features/Cart/Cart";

const apiKey = "a84f0896-7c1a-11ef-8e53-0a00184fe694";

const UpdatePersonalData = () => {
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    avatarUrl: "",
    city: "",
    district: "",
    ward: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // flag to track if data is loaded

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
          avatarUrl: userData.photoUrl || "",
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

  useEffect(() => {
    if (cities.length > 0) {
      if (formData.city) setSelectedCity(parseInt(formData.city));
      if (formData.district) setSelectedDistrict(parseInt(formData.district));
      if (formData.ward) setSelectedWard(parseInt(formData.ward));
    }
  }, [cities, isDataLoaded, formData.ward]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCity || !selectedDistrict || !selectedWard) {
      message.error(
        "Vui lòng chọn đầy đủ thông tin về Thành Phố, Quận và Phường"
      );
      return;
    }

    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      message.error("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
      return;
    }

    const payload = {
      fullName: formData.name,
      phoneNumber: formData.phoneNumber,
      district: selectedDistrict.toString(),
      city: selectedCity.toString(),
      photoUrl: formData.avatarUrl,
      ward: selectedWard.toString(),
    };

    setIsLoading(true);
    try {
      const response = await api.put(
        `api/account/UpdateUserInfo/${userId}`,
        payload
      );
      if (response.status === 200) {
        message.success("Thông tin cá nhân đã được cập nhật thành công");
      } else {
        message.error("Cập nhật thông tin không thành công, vui lòng thử lại.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
        message.error(
          `Error: ${error.response.data.message || "Có lỗi xảy ra."}`
        );
      } else {
        console.error("Error:", error);
        message.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-cream p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Thông Tin Cá Nhân */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-500 mb-8">
            Thông Tin Cá Nhân
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ảnh Đại Diện */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img
                    src={
                      formData.avatarUrl || "https://via.placeholder.com/150"
                    }
                    alt="Avatar"
                    className="size-56 rounded-full object-cover border border-gray-300"
                  />
                </div>
              </div>

              {/* Họ và Tên, Email */}
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">Họ và Tên</Label>
                  <Input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    className="bg-gray-100 border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Email</Label>
                  <Input
                    disabled
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    className="bg-gray-100 border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Số Điện Thoại</Label>
                  <Input
                    required
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    className="bg-gray-100 border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-gray-700">URL Ảnh Đại Diện</Label>
              <Input
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                placeholder="Nhập URL ảnh đại diện"
                className="bg-gray-100 border-gray-300 w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Thành phố */}
              <div>
                <Label className="text-gray-700">Thành Phố</Label>
                <Dropdown
                  size="md"
                  color="teal"
                  className="h-64 overflow-auto"
                  label={
                    selectedCity
                      ? cities.find((city) => city.ProvinceID === selectedCity)
                          ?.ProvinceName
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

              {/* Quận */}
              <div>
                <Label className="text-gray-700">Quận</Label>
                <Dropdown
                  size="md"
                  className="h-64 overflow-auto"
                  color="teal"
                  label={
                    selectedDistrict
                      ? districts.find(
                          (district) => district.DistrictID === selectedDistrict
                        )?.DistrictName
                      : "Chọn Quận"
                  }
                  disabled={!selectedCity}
                >
                  {districts.map((district) => (
                    <Dropdown.Item
                      key={district.DistrictID}
                      onClick={() => setSelectedDistrict(district.DistrictID)}
                    >
                      {district.DistrictName}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>

              {/* Phường */}
              <div>
                <Label className="text-gray-700">Phường</Label>
                <Dropdown
                  size="md"
                  color="teal"
                  className="h-64 overflow-auto"
                  label={
                    selectedWard
                      ? wards.find((ward) => ward.WardCode === selectedWard)
                          ?.WardName
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

            <div className="justify-center grid grid-cols-1 md:grid-cols-2 gap-8">
              <Button
                type="submit"
                size="xl"
                disabled={isLoading}
                pill
                isProcessing={isLoading}
                gradientDuoTone="redToYellow"
                className="text-white"
              >
                {isLoading ? "Đang xử lý..." : "Cập Nhật Thông Tin"}
              </Button>
              <Button
                size="xl"
                disabled={isLoading}
                pill
                outline
                onClick={handleLogout}
                gradientDuoTone="redToYellow"
                className="text-white"
              >
                {isLoading ? "Đang xử lý..." : "Đăng xuất"}
              </Button>
            </div>
          </form>
        </div>

        {/* Đổi Mật Khẩu */}
        <ChangePasswordCard email={email} />
      </motion.div>
    </div>
  );
};

export default UpdatePersonalData;
