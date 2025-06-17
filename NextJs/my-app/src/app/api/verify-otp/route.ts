import { otpStore } from '@/lib/otp-store';
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const validOtp = otpStore.get(email);
  if (otp === validOtp) {
    otpStore.delete(email);

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "30s" });

    const response = NextResponse.json({ message: "Authenticated" });


    response.cookies.set("jwt_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 30,
      sameSite: "strict",
    });
    return response;
  }

  return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
}