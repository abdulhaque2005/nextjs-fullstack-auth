import { deleteSession } from "@/lib/session";

export async function POST() {
  try {
    await deleteSession();

    return Response.json(
      {
        success: true,
        data: null,
        message: "Logged out successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        data: null,
        message: error?.message || "Failed to logout",
      },
      { status: 500 }
    );
  }
}
