"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, LogOut } from "lucide-react";
import { toast } from "sonner";

interface HeaderProps {
  user?: {
    name?: string;
    email?: string;
  } | null;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      const data = await response.json();
      toast.success(data.message || "Logged out successfully");
      window.location.href = "/login";
    } catch {
      toast.error("Failed to log out");
    }
  };

  const displayName = user?.name || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div>
      <header className="flex items-center justify-between border-b bg-white px-6 py-4 md:px-10">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-lg border p-2 text-gray-500 hover:bg-gray-50">
            <Search size={20} />
          </button>
          <button className="relative rounded-lg border p-2 text-gray-500 hover:bg-gray-50">
            <Bell size={20} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
              {initials}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{displayName}</p>
              <p className="text-xs text-gray-500">{user?.email || "Member"}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
    </div>
  );
}
