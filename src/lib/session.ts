import { cookies } from "next/headers";
import { COOKIE_NAME, signToken, verifyToken, SessionPayload } from "./jwt";

export type { SessionPayload };

/**
 * Creates an encrypted session cookie containing the JWT token.
 * Sets standard security options: httpOnly, secure (in prod), sameSite.
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
 * Can be used in Server Components, Server Actions, and Route Handlers.
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
 * Deletes the session cookie upon logout.
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
