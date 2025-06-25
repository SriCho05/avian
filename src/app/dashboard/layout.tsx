import Link from "next/link";
import { PlaneTakeoff, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/dashboard/DashboardClient";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <PlaneTakeoff className="h-8 w-8 text-primary" />
            <span className="font-headline">Avian Pilot Portal</span>
          </Link>
          <nav className="flex items-center gap-2">
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
