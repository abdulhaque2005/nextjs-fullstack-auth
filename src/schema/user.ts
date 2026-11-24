import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
  password: z.coerce.string().min(3, "Password must be at least 3 characters"),
});
