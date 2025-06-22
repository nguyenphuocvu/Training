import { NextRequest, NextResponse } from "next/server";
import * as nodemailer from "nodemailer";
import { otpStore } from "@/lib/otp-store";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore.set(email, otp);
  console.log("OTP đã lưu:", otp);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
    zzz : 1 , 
  });

  return NextResponse.json({ message: "OTP sent" });
}