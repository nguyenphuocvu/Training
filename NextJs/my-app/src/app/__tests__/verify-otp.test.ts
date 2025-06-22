/**
 * @jest-environment node
 */

import { POST as verifyOtpHandler } from '@/app/api/verify-otp/route';
import { otpStore } from '@/lib/otp-store';
import { Request, Headers } from 'undici';

global.Request = Request;
global.Headers = Headers;


describe('/api/verify-otp API Endpoint', () => {
  const validEmail = 'test@gmail.com';
  const validOtp = '123456';

  beforeEach(() => {
    otpStore.set(validEmail, validOtp);
  });

  afterEach(() => {
    otpStore.delete(validEmail);
  });

  function createRequest(body: object) {
    return new Request('http://localhost/api/verify-otp', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  it('trả về 200 khi OTP hợp lệ', async () => {
    const req = createRequest({ email: validEmail, otp: validOtp });
    const res = await verifyOtpHandler(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ message: 'Authenticated' });

    const cookies = res.headers.getSetCookie?.() || [];
    expect(cookies.some((cookie) => cookie.includes('jwt_token'))).toBe(true);
  });

  it('trả về 401 khi OTP không đúng', async () => {
    const req = createRequest({ email: validEmail, otp: 'wrong' });
    const res = await verifyOtpHandler(req);

    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json).toEqual({ message: 'Invalid OTP' });
  });

  it('trả về 401 khi email không tồn tại trong otpStore', async () => {
    const req = createRequest({ email: 'unknown@gmail.com', otp: validOtp });
    const res = await verifyOtpHandler(req);

    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json).toEqual({ message: 'Invalid OTP' });
  });
});
