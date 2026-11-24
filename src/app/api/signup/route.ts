import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { userSchema } from "@/schema/user";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = userSchema.safeParse(body);

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

    const existingUser = await User.findOne({ email: result.data.email });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "User already exists with this email",
        },
        { status: 400 }
      );
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    const newUser = await User.create({
      name: result.data.name,
      email: result.data.email,
      password: hashedPassword,
    });

    return Response.json(
      {
        success: true,
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        message: "Account created successfully. Please sign in.",
      },
      { status: 201 }
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
