import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextInput, Label } from "flowbite-react";

const SignUp = () => {
  const navigate = useNavigate();
  //   const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    // if (password !== confirmPassword) {
    //   //   toast({
    //   //     title: "Error",
    //   //     description: "Passwords do not match",
    //   //     variant: "destructive",
    //   //   });
    //   return;
    // }
    // TODO: Implement actual signup logic
    //  toast({
    //     title: "Verification Code Sent",
    //     description: "Please check your email to verify your account.",
    //   });
    navigate(
      `/auth/verify-code?email=${encodeURIComponent(email)}&type=signup`
    );
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
          alt="Sign up background"
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
          className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-primary-800">
              Tạo tài khoản
            </h2>
            <p className="mt-2 text-sm text-primary-600">
              Tham gia ngay và bắt đầu mua sắm hôm nay!
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
              <div>
                <Label htmlFor="password">Mật khẩu</Label>
                <TextInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tạo mật khẩu..."
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <TextInput
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Xác nhận mật khẩu..."
                  required
                  className="mt-1"
                />
              </div>
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
                Đăng ký
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm"
            >
              Đã có tài khoản?{" "}
              <Link
                to="/auth/login"
                className="text-coffee-600 hover:text-coffee-800 transition-colors"
              >
                Đăng nhập
              </Link>
            </motion.p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
