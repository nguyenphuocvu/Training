import { otpStore } from '@/lib/otp-store';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {email , otp} = await req.json();

    const validOtp = otpStore.get(email)
    if(otp === validOtp){
        otpStore.delete(email)
        return NextResponse.json({token : "valid-token-example"})
    }

    return NextResponse.json({message : "Invalid OTP"} , {status : 401})
}