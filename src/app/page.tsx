import Link from "next/link";
import { LayoutDashboard, UserPlus, LogIn } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <LayoutDashboard size={28} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">DashFlow</h1>
        <p className="mt-2 text-sm text-gray-500">
          Simple Authentication and Dashboard System
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <LogIn size={16} />
            Sign In
          </Link>
          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <UserPlus size={16} />
            Create Account
          </Link>

        </div>
      </div>
    </main>
  );
}
