import React, { useState } from "react";
import { Button, TextInput as Input, Label } from "flowbite-react";
import { useNavigate } from "react-router-dom"; // Để điều hướng trang
import api from "../../../features/AxiosInstance/AxiosInstance";
import { message } from "antd";

const ChangePasswordCard = ({ email }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Để điều hướng tới trang quên mật khẩu

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setErrorPass(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorPass("Mật khẩu mới không khớp.");
      return;
    }

    setErrorPass("");
    setIsLoading(true);

    try {
      console.log({
        email: email,
        password: currentPassword,
      });

      // Kiểm tra mật khẩu hiện tại
      const checkPasswordResponse = await api.post(
        "api/account/CheckUserCurrentPass",
        {
          email: email,
          password: currentPassword,
        }
      );

      console.log(checkPasswordResponse);

      if (checkPasswordResponse.status !== 200) {
        setError("Mật khẩu hiện tại không đúng.");
        setIsLoading(false);
        return;
      }

      console.log({
        email: email,
        Newpassword: newPassword,
      });

      // Nếu mật khẩu hiện tại đúng, tiếp tục đổi mật khẩu
      const response = await api.post("api/account/changepassword", {
        email: email,
        newPassword: newPassword,
      });

      console.log(response.data);

      if (response.status === 200) {
        message.success("Đổi mật khẩu thành công!");
        // Điều hướng tới trang khác nếu cần
      } else {
        setError(
          response.data.message || "Đổi mật khẩu thất bại. Vui lòng thử lại."
        );
      }
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-yellow-500 mb-8">Đổi Mật Khẩu</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Label className="text-gray-700">Mật Khẩu Hiện Tại</Label>
          <Input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            placeholder="Nhập mật khẩu hiện tại"
            className="bg-gray-100 border-gray-300"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p
            className="text-primary-500 text-sm mt-2 cursor-pointer"
            onClick={() => navigate("/auth/forgot-password")}
          >
            Quên mật khẩu?
          </p>
        </div>
        <div>
          <Label className="text-gray-700">Mật Khẩu Mới</Label>
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Nhập mật khẩu mới"
            className="bg-gray-100 border-gray-300"
          />
        </div>
        <div>
          <Label className="text-gray-700">Xác Nhận Mật Khẩu</Label>
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            className="bg-gray-100 border-gray-300"
          />
        </div>
      </div>

      {errorPass && (
        <p className="text-red-500 text-center text-sm mt-4">{errorPass}</p>
      )}

      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          size="xl"
          pill
          gradientDuoTone="redToYellow"
          className="text-white"
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Đổi Mật Khẩu"}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordCard;
