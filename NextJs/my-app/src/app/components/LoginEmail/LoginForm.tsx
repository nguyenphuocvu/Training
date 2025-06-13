"use client";
import React, { useState } from "react";
import { Input, Button, Typography } from "antd";

const { Title, Text } = Typography;
const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string>("");
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
              className="mb-4"
            />
            <Button className="mt-2" onClick={() => setOtpSent(true)}>
              Gửi mã OTP
            </Button>
          </>
        ) : (
          <>
            <Text className="block mb-2"> Nhập mã OTP </Text>
            <Input className="mb-4 tracking-widest text-center font-bold text-xl" />
            <Button className="mt-2">Xác thực</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
