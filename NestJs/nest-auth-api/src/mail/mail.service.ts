import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,    
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendOtp(email: string, otp: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    await this.transporter.sendMail(mailOptions);
    console.log(`Sent OTP ${otp} to ${email}`);
  }
}
