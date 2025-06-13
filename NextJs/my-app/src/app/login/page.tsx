"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Typography, message } from "antd";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) router.push("/home");
  }, []);

  //Gửi OTP
  const sendOTP = async () => {
    if (!email) return message.error("Vui lòng nhập email");

    const res = await fetch("/api/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application" },
    });

    if (res.ok) {
      message.success("Mã OTP đã được gửi");
      setOtpSent(true);
    } else {
      message.error("Không thể gửi mã OTP");
    }
  };
  //Xác thực OTP
  const verifyOTP = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
      headers: { "Content-Type": "application" },
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("auth_token", data.token);
      router.push("/home");
    } else {
      message.error("OTP không đúng");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <Title className="text-center mb-6"> Đăng nhập </Title>
        {!otpSent ? (
          <>
            <Text className="block mb-2">Nhập email</Text>
            <Input
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <Button className="mt-2" block type="primary" onClick={sendOTP}>
              Gửi mã OTP
            </Button>
          </>
        ) : (
          <>
            <Text className="block mb-2"> Nhập mã OTP </Text>
            <Input
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-4 text-center text-xl"
            />
            <Button type="primary" block className="mt-2" onClick={verifyOTP}>
              Xác thực
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;


