import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextInput, Label } from "flowbite-react";
import api from "../../../features/AxiosInstance/AxiosInstance";

const forgotPasswordBgImage =
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&w=800&q=75";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(""); // Trạng thái lỗi
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Gọi API gửi mã xác nhận
      const response = await api.post(
        `api/account/send-verification-code/${encodeURIComponent(email)}`
      );

      const data = response.data;

      if (response.status === 200 && data.status === "success") {
        setIsSubmitted(true); // Đánh dấu đã gửi yêu cầu thành công

        // Điều hướng tới trang xác minh sau vài giây
        setTimeout(() => {
          navigate(
            `/auth/verify-code?email=${encodeURIComponent(email)}&type=reset`
          );
        }, 3000);
      } else {
        setError(data.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (error) {
      // Xử lý lỗi từ server hoặc lỗi kết nối
      if (error.response) {
        setError(error.response.data.message || "Đã xảy ra lỗi.");
      } else {
        setError("Không thể kết nối tới server. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }

    //navigate(`/auth/verify-code?email=${encodeURIComponent(email)}&type=reset`);
  };

  return (
    <div className="min-h-screen flex relative">
      <div className="hidden lg:block lg:w-1/2 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-coffee-200 animate-pulse" />
        )}
        <img
          src={forgotPasswordBgImage}
          alt="Forgot password background"
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
      </div>

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
                Cài lại mật khẩu
              </h2>
              <p className="mt-2 text-sm text-primary-600">
                Vui lòng nhập email để nhận mã xác nhận
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email..."
                  required
                  className="mt-1"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full p-3 text-sm h-full rounded-xl text-white bg-primary-600 hover:bg-primary-700"
              >
                {isLoading ? "Đang xử lý..." : "Gửi mã"}
              </button>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-sm text-gray-700 mt-4"
                >
                  Đang gửi mã xác minh, vui lòng đợi...
                </motion.div>
              )}

              <p className="text-center text-sm">
                Đã nhớ mật khẩu?{" "}
                <Link
                  to="/auth/login"
                  className="text-primary-600 hover:text-primary-800 transition-colors"
                >
                  Đăng nhập
                </Link>
              </p>
            </motion.form>
          </motion.div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-gray-900">
              Kiểm tra email của bạn
            </h3>
            <p className="text-sm text-gray-600">
              Chúng tôi đã gửi mã xác minh đến email của bạn.
            </p>
            <p className="text-sm text-gray-500">
              Đang chuyển hướng đến trang xác minh trong vài giây...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
