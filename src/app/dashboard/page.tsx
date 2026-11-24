import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { getSession } from "@/lib/session";
import {
    Users,
    ShoppingBag,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Plus
} from "lucide-react";

const stats = [
    {
        title: "Total Revenue",
        value: "$24,580",
        change: "+12.5%",
        positive: true,
        icon: TrendingUp,
        description: "Compared to last month",
    },
    {
        title: "Total Users",
        value: "1,248",
        change: "+8.2%",
        positive: true,
        icon: Users,
        description: "Compared to last month",
    },
    {
        title: "Total Orders",
        value: "856",
        change: "-3.4%",
        positive: false,
        icon: ShoppingBag,
        description: "Compared to last month",
    },
    {
        title: "Growth Rate",
        value: "18.6%",
        change: "+4.1%",
        positive: true,
        icon: TrendingUp,
        description: "Compared to last month",
    },
];

const activities = [
    {
        title: "New user registered",
        description: "John Doe created a new account",
        time: "5 minutes ago",
        color: "bg-blue-500",
    },
    {
        title: "New order received",
        description: "Order #ORD-1024 was placed",
        time: "25 minutes ago",
        color: "bg-green-500",
    },
    {
        title: "Payment completed",
        description: "Payment of $240.00 received",
        time: "1 hour ago",
        color: "bg-purple-500",
    },
    {
        title: "Product updated",
        description: "Wireless Headphones inventory updated",
        time: "3 hours ago",
        color: "bg-orange-500",
    },
];

const quickActions = [
    {
        title: "Add New User",
        description: "Create a new user account",
        icon: Users,
    },
    {
        title: "Create Order",
        description: "Add a new order",
        icon: ShoppingBag,
    },
    {
        title: "View Reports",
        description: "Check your business performance",
        icon: TrendingUp,
    },
];

export default async function DashboardPage() {
    const session = await getSession();
    const userName = session?.name || "User";

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Sidebar />
            <main className="lg:ml-64">
                <Header user={session} />
                <div className="p-6 md:p-10">
                    <div className="mb-8 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 p-8 text-white">
                        <h2 className="text-2xl font-bold">Good morning, {userName}! 👋</h2>
                        <p className="mt-2 text-indigo-100">
                            Here's a quick overview of your business performance.
                        </p>
                        <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                            View Reports
                            <ArrowUpRight size={16} />
                        </button>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.title}
                                    className="rounded-xl border bg-white p-6 shadow-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500">{stat.title}</p>
                                        <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                                            <Icon size={20} />
                                        </div>
                                    </div>

                                    <h3 className="mt-4 text-2xl font-bold">{stat.value}</h3>

                                    <div className="mt-3 flex items-center gap-2 text-sm">
                                        {stat.positive ? (
                                            <ArrowUpRight size={16} className="text-green-600" />
                                        ) : (
                                            <ArrowDownRight size={16} className="text-red-600" />
                                        )}
          
                                        <span
                                            className={
                                                stat.positive ? "text-green-600" : "text-red-600"
                                            }
                                        >
                                            {stat.change}
                                        </span>

                                        <span className="text-gray-400">
                                            {stat.description}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 grid gap-6 xl:grid-cols-3">
                        <section className="rounded-xl border bg-white p-6 xl:col-span-2">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Recent Activity</h2>
                                <button className="text-sm font-medium text-indigo-600 hover:underline">
                                    View all
                                </button>
                            </div>

                            <div className="space-y-6">
                                {activities.map((activity, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="relative">
                                            <div
                                                className={`h-3 w-3 rounded-full ${activity.color} mt-1.5`}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.title}</p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {activity.description}
                                            </p>
                                            <p className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                                                <Clock size={12} />
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-xl border bg-white p-6">
                            <h2 className="mb-6 text-lg font-semibold">Quick Actions</h2>

                            <div className="space-y-3">
                                {quickActions.map((action) => {
                                    const Icon = action.icon;

                                    return (
                                        <button
                                            key={action.title}
                                            className="flex w-full items-center gap-3 rounded-lg border p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50"
                                        >
                                            <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
                                                <Icon size={20} />
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{action.title}</p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {action.description}
                                                </p>
                                            </div>

                                            <Plus size={18} className="text-gray-400" />
                                        </button>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    <footer className="mt-10 text-center text-sm text-gray-400">
                        © 2026 DashFlow. All rights reserved.
                    </footer>
                </div>
            </main>
        </div>
    );
}
