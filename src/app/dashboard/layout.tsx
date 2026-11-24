import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const user = cookieStore.get("user")?.value;

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
