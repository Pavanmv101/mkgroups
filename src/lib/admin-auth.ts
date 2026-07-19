import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'mKgRoUp-s3cReT-jwt-k3y-2024-xYz'
);

const COOKIE_NAME = 'mk_admin_session';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function createAdminSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
