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

    // 1. Validation check
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

    const { email, password } = result.data;

    // 2. Connect to database
    await connectToDatabase();

    // 3. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "User not found with this email",
        },
        { status: 404 }
      );
    }

    // 4. Verify password (supports both bcrypt hash and legacy plain text)
    let isPasswordValid = false;

    if (user.password === password) {
      // Legacy plain-text password match -> auto-upgrade to bcrypt
      isPasswordValid = true;
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne({ _id: user._id }, { password: hashedPassword });
      } catch (err) {
        console.error("Auto-hash error:", err);
      }
    } else {
      // Check bcrypt hash
      try {
        isPasswordValid = await bcrypt.compare(password, user.password);
      } catch {
        isPasswordValid = false;
      }
    }

    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "Invalid password",
        },
        { status: 401 }
      );
    }

    // 5. Create secure HTTP-only cookie with JWT session
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
    console.error("Login API error:", error);
    return Response.json(
      {
        success: false,
        data: null,
        message: error?.message || "Server error occurred",
      },
      { status: 500 }
    );
  }
}
