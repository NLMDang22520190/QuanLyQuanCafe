import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, TextInput } from "flowbite-react";

const VerifyCode = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //   const { toast } = useToast();
  const [code, setCode] = useState("");
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "reset"; // 'reset' or 'signup'

  const handleSubmit = async () => {
    // e.preventDefault();
    // // TODO: Implement actual verification logic
    // toast({
    //   title: "Code Verified",
    //   description:
    //     type === "reset"
    //       ? "You can now reset your password."
    //       : "Your account has been verified.",
    // });

    if (type === "reset") {
      navigate("/auth/reset-password");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="min-h-screen flex relative">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
          alt="Verify code background"
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
              Nhập mã xác nhận
            </h2>
            <p className="mt-2 text-sm text-coffee-600">
              Chúng tôi đã gửi mã tới {email}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex justify-center">
              <TextInput
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              className={`w-full h-full p-3 text-sm rounded-xl text-white ${
                code.length === 6
                  ? "bg-primary-600 hover:bg-primary-700"
                  : "bg-gray-400"
              }`}
              disabled={code.length !== 6}
            >
              Xác nhận
            </button>

            <p className="text-center text-sm text-primary-600">
              Không nhận được code?{" "}
              <button
                type="button"
                onClick={() => {
                  //   toast({
                  //     title: "Code Resent",
                  //     description: "Please check your email for the new code.",
                  //   });
                }}
                className="text-primary-800 hover:text-primary-900 underline"
              >
                Gửi lại mã
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyCode;
