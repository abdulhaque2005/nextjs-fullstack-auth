import React from 'react'
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Settings,
   
} from "lucide-react";
export default function Sidebar() {
    return (
        <div>
            <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white p-6 lg:block">
                <div className="mb-10 flex items-center gap-3">
                    <div className="rounded-xl bg-indigo-600 p-2 text-white">
                        <LayoutDashboard size={22} />
                    </div>
                    <span className="text-xl font-bold">DashFlow</span>
                </div>

                <nav className="space-y-2">
                    <a
                        href="#dashboard"
                        className="flex items-center gap-3 rounded-lg bg-indigo-50 px-4 py-3 font-medium text-indigo-600"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </a>
                    <a
                        href="#users"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-500 hover:bg-gray-50"
                    >
                        <Users size={20} />
                        Users
                    </a>
                    <a
                        href="#orders"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-500 hover:bg-gray-50"
                    >
                        <ShoppingBag size={20} />
                        Orders
                    </a>
                    <a
                        href="#settings"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-500 hover:bg-gray-50"
                    >
                        <Settings size={20} />
                        Settings
                    </a>
                </nav>
            </aside>

        </div>
    )
}
