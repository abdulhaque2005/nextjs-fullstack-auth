import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "auth_token";

// Minimum 32-character secret key for HS256
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "dashflow_super_secure_jwt_secret_key_2026_xyz"
);

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
}

/**
 * Sign a new JWT token with user session payload.
 * Edge-compatible (works in Middleware and API routes).
 */
export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

/**
 * Verify a JWT token and extract payload.
 * Edge-compatible (works in Middleware and API routes).
 */
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}
