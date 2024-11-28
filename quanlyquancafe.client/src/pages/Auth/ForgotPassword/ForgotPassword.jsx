import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextInput, Label } from "flowbite-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  //   const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    // e.preventDefault();
    // // TODO: Implement actual code sending logic
    // setIsSubmitted(true);
    // toast({
    //   title: "Verification Code Sent",
    //   description: "Please check your email for the verification code.",
    // });
    navigate(`/auth/verify-code?email=${encodeURIComponent(email)}&type=reset`);
  };

  return (
    <div className="min-h-screen flex relative">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
          alt="Forgot password background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
      </div>

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

            <button
              type="submit"
              className="w-full p-3 text-sm h-full rounded-xl text-white bg-primary-600 hover:bg-primary-700"
            >
              Gửi mã
            </button>

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
      </div>
    </div>
  );
};

export default ForgotPassword;
