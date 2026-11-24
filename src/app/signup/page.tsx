"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  LayoutDashboard,
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { userSchema } from "@/schema/user";

const signupSchema = userSchema
  .extend({
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupInput = z.input<typeof signupSchema>;
type SignupOutput = z.output<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput, any, SignupOutput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: SignupOutput) => {
    try {
      setServerError(null);
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setServerError(result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/login");
    } catch {
      setServerError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-white shadow-xl md:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 p-12 text-white md:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-white/10" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-2">
              <LayoutDashboard size={26} />
            </div>
            <span className="text-2xl font-bold">DashFlow</span>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold leading-tight">
              Start managing your business smarter.
            </h1>

            <p className="mt-5 leading-7 text-indigo-100">
              Create your account and get access to powerful tools that help you
              manage your business, track performance, and grow faster.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-2">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="font-semibold">Secure Platform</p>
                  <p className="text-sm text-indigo-100">
                    Your information stays protected.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-2">
                  <User size={22} />
                </div>
                <div>
                  <p className="font-semibold">Easy Management</p>
                  <p className="text-sm text-indigo-100">
                    Everything you need in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-indigo-200">
            © 2026 DashFlow. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="mb-8 md:hidden">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-600 p-2 text-white">
                <LayoutDashboard size={24} />
              </div>
              <span className="text-2xl font-bold">DashFlow</span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Get started by creating your free account.
            </p>
          </div>

          {serverError && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-11 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-start gap-2">
                <input
                  {...register("terms")}
                  id="terms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-indigo-600"
                />

                <label htmlFor="terms" className="text-sm leading-5 text-gray-500">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {errors.terms && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.terms.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-8 border-t pt-6 text-center text-xs text-gray-400">
            © 2026 DashFlow. All rights reserved
          </div>
        </div>
      </div>
    </main>
  );
}
