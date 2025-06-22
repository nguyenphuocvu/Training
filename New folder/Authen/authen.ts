// ✅ 1. Tạo OTP
// Tạo OTP ngẫu nhiên 6 chữ số
const otp = Math.floor(100000 + Math.random() * 900000).toString();
// 👉 Lệnh phổ biến:

Math.random()             // tạo số ngẫu nhiên
Math.floor()              // làm tròn xuống
toString()                // chuyển số thành chuỗi



// 📦 2. Lưu OTP tạm (vào RAM hoặc Redis, DB tạm)
// Ví dụ: dùng một Map để lưu tạm OTP trong RAM:
// Giả lập một store tạm
export const otpStore = new Map<string, string>();

// Khi gửi OTP:
otpStore.set(email, otp);

// Khi kiểm tra:
const storedOtp = otpStore.get(email);

// Khi xóa sau xác minh thành công:
otpStore.delete(email);
// 👉 Lệnh phổ biến:
Map.set(key, value)       // lưu OTP
Map.get(key)              // lấy OTP
Map.delete(key)           // xóa OTP
Hoặc dùng Redis:
await redis.set(email, otp, 'EX', 300);  // hết hạn sau 5 phút


// 📧 3. Gửi OTP (qua Email)
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

await transporter.sendMail({
  to: email,
  subject: 'Your OTP Code',
  html: `<p>Your OTP is <strong>${otp}</strong></p>`,
});
// 👉 Lệnh phổ biến:
nodemailer.createTransport()
transporter.sendMail()


// 🔍 4. Xác minh OTP
if (userInputOtp === storedOtp) {
  // Xác thực thành công
  otpStore.delete(email);
  return NextResponse.json({ token: "valid-token-example" });
} else {
  return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
}
// 👉 Lệnh phổ biến:
===           // so sánh OTP nhập với OTP đã lưu
delete        // xóa sau khi dùng


// 🛡️ Bonus: Tự động hết hạn OTP
// Khi dùng Map, bạn nên set setTimeout để tự xóa:

otpStore.set(email, otp);
setTimeout(() => otpStore.delete(email), 5 * 60 * 1000); // Xóa sau 5 phút


// ✨ Tổng kết các lệnh bạn cần nhớ:
// Mục đích	            Lệnh hoặc hàm phổ biến
Tạo OTP	                Math.random(), Math.floor()
Lưu tạm OTP	            Map.set(), Map.get(), Map.delete()
Gửi OTP	nodemailer.     createTransport(), sendMail()
Hết hạn OTP	            setTimeout(), Redis: EX
So sánh OTP             ===