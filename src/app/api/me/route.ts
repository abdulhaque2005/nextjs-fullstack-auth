import { getSession } from "@/lib/session";

/**
 * API route to check current session / cookie status.
 * Can be fetched by client or tools to verify authentication.
 */
export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return Response.json(
        {
          success: false,
          user: null,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        user: session,
        message: "Authenticated",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        user: null,
        message: error?.message || "Error verifying session",
      },
      { status: 500 }
    );
  }
}
