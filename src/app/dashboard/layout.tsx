import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If not logged in, redirect to login page
  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
