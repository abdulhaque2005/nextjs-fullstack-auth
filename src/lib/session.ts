import { cookies } from "next/headers";
import { COOKIE_NAME, signToken, verifyToken, SessionPayload } from "./jwt";

export type { SessionPayload };

/**
 * Creates an encrypted session cookie containing the JWT token.
 * Sets both 'auth_token' and legacy 'user' for total compatibility.
 */
export async function createSession(payload: SessionPayload): Promise<string> {
  const token = await signToken(payload);
  const cookieStore = await cookies();

  // Set modern JWT session cookie
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });

  // Also set 'user' cookie for any legacy checks
  cookieStore.set("user", payload.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return token;
}

/**
 * Retrieves the current user session from the cookie.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * Deletes session cookies upon logout.
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();

  // Delete main auth token
  cookieStore.set(COOKIE_NAME, "", {
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  cookieStore.delete(COOKIE_NAME);

  // Delete legacy 'user' cookie
  cookieStore.set("user", "", {
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  cookieStore.delete("user");
}
