import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Label } from "flowbite-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../../features/AxiosInstance/AxiosInstance";

const resetPasswordBgImage =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&w=800&q=75";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false); // Thêm state loading
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái xác nhận
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorPass(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorPass("Mật khẩu không khớp");
      return;
    }

    setErrorPass("");
    setIsLoading(true);

    try {
      // Gửi API đổi mật khẩu
      const response = await api.post("api/account/changepassword", {
        email: sessionStorage.getItem("email"),
        newPassword: password,
      });

      if (response.status === 200) {
        setIsSubmitted(true); // Hiển thị thông báo thành công
      } else {
        setError(
          response.data.message || "Đổi mật khẩu thất bại. Vui lòng thử lại."
        );
      }
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);

      // Xử lý lỗi từ server
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-coffee-200 animate-pulse" />
        )}
        <img
          src={resetPasswordBgImage}
          alt="Reset password background"
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
      </div>

      {/* Form Section */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-cream">
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-primary-800">
                Đặt mât khẩu mới
              </h2>
              <p className="mt-2 text-sm text-primary-600">
                Vui lòng nhập mật khẩu mới
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Mật khẩu mới</Label>
                  <TextInput
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới..."
                    required
                    className="mt-1"
                    helperText={
                      <span className="text-red-500 font-medium">
                        {errorPass}
                      </span>
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <TextInput
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu mới..."
                    required
                    className="mt-1"
                    helperText={
                      <span className="text-red-500 font-medium">
                        {errorPass}
                      </span>
                    }
                  />
                </div>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-full p-3 text-sm rounded-xl text-white bg-primary-600 hover:bg-primary-700"
              >
                {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </button>
            </motion.form>
          </motion.div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-gray-900">
              Đặt lại mật khẩu thành công
            </h3>
            <p className="text-sm text-gray-600">
              Mật khẩu của bạn đã được cập nhật.
            </p>
            <Link
              to="auth/login"
              className="inline-block mt-4 text-white bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Quay lại đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
