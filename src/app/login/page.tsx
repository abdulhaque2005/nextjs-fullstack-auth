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
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
      router.push("/dashboard");
    } catch {
      setServerError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-white shadow-xl md:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-indigo-600 to-purple-700 p-12 text-white md:flex">
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
              Welcome back to your workspace.
            </h1>

            <p className="mt-5 leading-7 text-indigo-100">
              Sign in to monitor your business metrics, view customer insights,
              and streamline your workflow with powerful tools.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white/20 p-2">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="font-semibold">Enterprise Security</p>
                  <p className="text-sm text-indigo-100">
                    Your data is protected and secure.
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
            <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your details to sign in to your account.
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
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-11 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  {...register("remember")}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Create an account
            </Link>
          </div>

          <div className="mt-8 border-t pt-6 text-center text-xs text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>
    </main>
  );
}
