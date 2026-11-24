import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          data: null,
          message: result.error.issues[0]?.message || "Validation failed",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email: result.data.email });
    if (!user) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Verify hashed password
    const isPasswordValid = await bcrypt.compare(
      result.data.password,
      user.password
    );

    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Set secure HTTP-only cookie with JWT token
    await createSession({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    return Response.json(
      {
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        message: "Login successful",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        data: null,
        message: error?.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
