import React from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextInput, Label } from "flowbite-react";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... keep existing code
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          alt="Login background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full space-y-8 bg-white p-12 rounded-xl shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold text-primary-800">Chào mừng</h2>
            <p className="mt-4 text-sm text-primary-600">
              Vui lòng đăng nhập vào tài khoản của bạn
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div>
                <Label className="text-lg" htmlFor="email">
                  Email
                </Label>
                <TextInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email..."
                  required
                  size={3}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-lg" htmlFor="password">
                  Mật khẩu
                </Label>
                <TextInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  required
                  className="mt-2"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <Link
                to="/auth/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="submit"
                className="w-full h-full p-3 text-sm rounded-xl text-white bg-primary-600 hover:bg-primary-700"
              >
                Đăng nhập
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm"
            >
              Chưa có tài khoản?{" "}
              <Link
                to="/auth/signup"
                className="text-coffee-600 hover:text-coffee-800 transition-colors"
              >
                Tạo tài khoản mới!
              </Link>
            </motion.p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
