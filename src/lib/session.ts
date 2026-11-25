import { cookies } from "next/headers";
import { COOKIE_NAME, signToken, verifyToken, SessionPayload } from "./jwt";

export type { SessionPayload };

/**
 * Creates an encrypted session cookie containing the JWT token.
 */
export async function createSession(payload: SessionPayload): Promise<string> {
  const token = await signToken(payload);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
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
 * Deletes the session cookie completely upon logout.
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();

  // Expire and delete main auth token
  cookieStore.set(COOKIE_NAME, "", {
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  cookieStore.delete(COOKIE_NAME);

  // Also clean up any legacy 'user' cookie
  cookieStore.set("user", "", {
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  cookieStore.delete("user");
}
