import React, { useState, useEffect } from "react";
import { Input, Button, Select, message } from "antd";
import { Label, Datepicker, Dropdown } from "flowbite-react";
import api from "../../features/AxiosInstance/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import "./personal.css";

const apiKey = "a84f0896-7c1a-11ef-8e53-0a00184fe694";

const Personal = () => {
  const { Option } = Select;
  // const [form] = Form.useForm();
  // const [avatar, setAvatar] = useState(null);

  // const handleFinish = (values) => {
  //   message.success("Information updated successfully!");
  //   console.log("Updated values:", values);
  // };

  // const handleAvatarChange = (info) => {
  //   if (info.file.status === "done") {
  //     setAvatar(URL.createObjectURL(info.file.originFileObj));
  //     message.success(`${info.file.name} uploaded successfully.`);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} upload failed.`);
  //   }
  // };

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
        localStorage.setItem("email", userData.email);
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

  return (
    // <Card style={{color:'#ffc107'}} title="Personal Information" bordered={false}>
    //   <Form
    //     form={form}
    //     layout="vertical"
    //     onFinish={handleFinish}
    //     initialValues={{
    //       gender: "male",
    //     }}
    //   >
    //     <Row gutter={16}>
    //       {/* Avatar Upload */}
    //       <Col span={8}>
    //         <Form.Item label="Avatar">
    //           <Upload
    //             listType="picture-circle"
    //             showUploadList={false}
    //             onChange={handleAvatarChange}
    //             accept="image/*"
    //           >
    //             {avatar ? (
    //               <img
    //                 src={avatar}
    //                 alt="avatar"
    //                 style={{ width: "100%", borderRadius: "50%" }}
    //               />
    //             ) : (
    //               <div>
    //                 <UserOutlined style={{ fontSize: 24 }} />
    //                 <div>Upload</div>
    //               </div>
    //             )}
    //           </Upload>
    //         </Form.Item>
    //       </Col>

    //       {/* Name */}
    //       <Col span={8}>
    //         <Form.Item
    //           name="name"
    //           label="Name"
    //           rules={[{ required: true, message: "Please enter your name!" }]}
    //         >
    //           <Input placeholder="Enter your name"
    //           prefix={<svg width={"0px"} height={"0px"}></svg>}/>
    //         </Form.Item>
    //       </Col>

    //       {/* Email */}
    //       <Col span={8}>
    //         <Form.Item
    //           name="email"
    //           label="Email"
    //           rules={[
    //             { required: true, message: "Please enter your email!" },
    //             { type: "email", message: "Please enter a valid email address!" },
    //           ]}
    //         >
    //           <Input placeholder="Enter your email"
    //           prefix={<svg width={"0px"} height={"0px"}></svg>}/>
    //         </Form.Item>
    //       </Col>
    //     </Row>

    //     <Row gutter={16}>
    //       {/* Phone */}
    //       <Col span={8}>
    //         <Form.Item
    //           name="phone"
    //           label="Phone Number"
    //           rules={[
    //             { required: true, message: "Please enter your phone number!" },
    //             { pattern: /^[0-9]+$/, message: "Phone number must be numeric!" },
    //           ]}
    //         >
    //           <Input placeholder="Enter your phone number"
    //           prefix={<svg width={"0px"} height={"0px"}></svg>} />
    //         </Form.Item>
    //       </Col>

    //       {/* Date of Birth */}
    //       <Col span={8}>
    //         <Form.Item
    //           name="dob"
    //           label="Date of Birth"
    //           rules={[{ required: true, message: "Please select your date of birth!" }]}
    //         >
    //           <DatePicker style={{ width: "100%" }} />
    //         </Form.Item>
    //       </Col>

    //       {/* Gender */}
    //       <Col span={8}>
    //         <Form.Item name="gender" label="Gender">
    //           <Radio.Group>
    //             <Radio value="male">Male</Radio>
    //             <Radio value="female">Female</Radio>
    //             <Radio value="other">Other</Radio>
    //           </Radio.Group>
    //         </Form.Item>
    //       </Col>
    //     </Row>

    //     {/* Save Button */}
    //     <Row justify="center">
    //       <Col span={6}>
    //         <Form.Item>
    //           <Button type="primary" htmlType="submit" block>
    //             Save Changes
    //           </Button>
    //         </Form.Item>
    //       </Col>
    //     </Row>
    //   </Form>
    // </Card>
    <div className="bg-[#212121] rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-yellow-500 mb-8">
        Thông Tin Cá Nhân
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ảnh Đại Diện */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={formData.avatarUrl || "https://via.placeholder.com/150"}
                alt="Avatar"
                className="size-56 rounded-full object-cover border border-gray-300"
              />
            </div>
          </div>

          {/* Họ và Tên, Email */}
          <div className="space-y-4">
            <div>
              <Label className="text-white">Họ và Tên</Label>
              <Input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                prefix={<svg width={"0px"} height={"0px"}></svg>}
              />
            </div>
            <div>
              <Label className="text-white">Email</Label>
              <Input
                disabled
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
                prefix={<svg width={"0px"} height={"0px"}></svg>}
              />
            </div>
            <div>
              <Label className="text-white">Số Điện Thoại</Label>
              <Input
                required
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                prefix={<svg width={"0px"} height={"0px"}></svg>}
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-white">URL Ảnh Đại Diện</Label>
          <Input
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
            placeholder="Nhập URL ảnh đại diện"
            prefix={<svg width={"0px"} height={"0px"}></svg>}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thành phố */}
          <div>
            <Label className="text-white">Thành Phố</Label>
            <Select
              size="middle" // Tương đương size="md"
              style={{ width: "100%", height: "64px", overflow: "auto" }}
              placeholder="Chọn Thành Phố" // Label mặc định
              value={selectedCity ? selectedCity : undefined}
              onChange={(value) => setSelectedCity(value)} // Xử lý khi chọn thành phố
            >
              {cities.map((city) => (
                <Option key={city.ProvinceID} value={city.ProvinceID}>
                  {city.ProvinceName}
                </Option>
              ))}
            </Select>
          </div>

          {/* Quận */}
          <div>
            <Label className="text-white">Quận</Label>
            <Select
              size="middle"
              style={{ width: "100%", height: "64px", overflow: "auto" }}
              placeholder="Chọn Quận"
              value={selectedDistrict ? selectedDistrict : undefined}
              onChange={(value) => setSelectedDistrict(value)} // Xử lý khi chọn quận
              disabled={!selectedCity} // Vô hiệu hóa khi không có thành phố được chọn
            >
              {districts.map((district) => (
                <Option key={district.DistrictID} value={district.DistrictID}>
                  {district.DistrictName}
                </Option>
              ))}
            </Select>
          </div>

          {/* Phường */}
          <div>
            <Label className="text-white">Phường</Label>
            <Select
              size="middle" // Tương đương với size="md" trong Flowbite React
              style={{ width: "100%", height: "64px", overflow: "auto" }} // Tương tự className="h-64 overflow-auto"
              placeholder="Chọn Phường" // Placeholder mặc định
              value={selectedWard ? selectedWard : undefined}
              onChange={(value) => setSelectedWard(value)}
              disabled={!selectedDistrict} // Vô hiệu hóa nếu không có district được chọn
            >
              {wards.map((ward) => (
                <Option key={ward.WardCode} value={ward.WardCode}>
                  {ward.WardName}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="justify-center grid grid-cols-1 gap-8">
          <Button
            htmlType="submit"
            type="primary"
            size="xl"
            disabled={isLoading}
            pill
            isProcessing={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Cập Nhật Thông Tin"}
          </Button>

          {/* <Button type="primary" htmlType="submit" block>
                    Add New User
                  </Button> */}
        </div>
      </form>
    </div>
  );
};

export default Personal;
