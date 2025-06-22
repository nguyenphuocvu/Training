/**
 * @jest-environment node
 */

import { POST as sendOtpHandler } from "@/app/api/send-otp/route";
import { otpStore } from "@/lib/otp-store";
import { Request, Headers } from "undici";

global.Request = Request;
global.Headers = Headers;

const sendMailMock = jest.fn();

jest.mock("nodemailer", () => ({
  createTransport: () => ({
    sendMail: sendMailMock,
  }),
}));

describe("/api/send-otp API Endpoint", () => {
  const email = "test@gmail.com";

  beforeEach(() => {
    otpStore.delete(email);
    sendMailMock.mockClear();
  });

  function createRequest(body: object) {
    return new Request("http://localhost/api/send-otp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }

  it("gửi OTP và lưu vào otpStore", async () => {
    const req = createRequest({ email });
    const res = await sendOtpHandler(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ message: "OTP sent" });

    const otp = otpStore.get(email);
    expect(otp).toBeDefined();

    const sendMailArg = sendMailMock.mock.calls[0][0];

    const expectedKeys = ["from", "to", "subject", "text"];

    expect(Object.keys(sendMailArg).sort()).toEqual(expectedKeys.sort());

    expect(sendMailArg).toMatchObject({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
    });

    expect(sendMailArg.text).toContain(otp);
  });

  it("trả về 400 nếu không có email", async () => {
    const req = createRequest({});
    const res = await sendOtpHandler(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toEqual({ message: "Email is required" });
  });
});
