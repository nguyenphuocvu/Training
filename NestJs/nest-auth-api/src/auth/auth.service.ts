import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { MailService } from 'src/mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private userModel: Model<AuthDocument>,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) throw new BadRequestException('Email already exists');
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new this.userModel({
      email: dto.email,
      password: hashedPassword,
      otp: otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    await user.save();
    await this.mailService.sendOtp(dto.email, otp);

    return { message: 'Registered. OTP sent to email' };
  }

  async login(dto: CreateAuthDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new BadRequestException('Invalid email or password');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new BadRequestException('Invalid email or password');

    const payload = { email: user.email, id: user._id };
    const token = await this.jwtService.signAsync(payload);

    return { message: 'Login successful', token };
  }

  async sendOtp(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('Email not found');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await this.mailService.sendOtp(email, otp);
    return { message: 'OTP sent to email' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || !user.otp || !user.otpExpires) {
      throw new BadRequestException('OTP not found');
    }

    const now = new Date();
    if (user.otp !== otp || now > user.otpExpires) {
      throw new BadRequestException('OTP invalid or expired');
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const payload = { email: user.email, id: user._id };
    const token = await this.jwtService.signAsync(payload);
    return { message: 'OTP verified successfully', token };
  }
}
