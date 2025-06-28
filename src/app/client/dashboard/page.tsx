import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/client/DashboardClient";

export default async function ClientDashboardPage() {
  const session = await getSession();

  if (!session?.user || session.user.role !== 'client') {
    redirect("/client/login");
  }

  return <DashboardClient user={session.user} />;
}
