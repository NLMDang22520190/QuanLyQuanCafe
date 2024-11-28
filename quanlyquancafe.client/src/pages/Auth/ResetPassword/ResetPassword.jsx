import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Label } from "flowbite-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //   const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    // e.preventDefault();
    // if (password !== confirmPassword) {
    //   toast({
    //     title: "Error",
    //     description: "Passwords do not match",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    // // TODO: Implement actual password reset logic
    // toast({
    //   title: "Password Reset",
    //   description: "Your password has been successfully reset.",
    // });
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Reset password background"
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
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-full p-3 text-sm rounded-xl text-white bg-primary-600 hover:bg-primary-700"
            >
              Reset Password
            </button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
