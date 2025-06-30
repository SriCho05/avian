import Link from "next/link";
import { PlaneTakeoff, Briefcase } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

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
            <Button variant="outline" asChild>
                <Link href="/dashboard/jobs">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Browse Jobs
                </Link>
            </Button>
            <ThemeToggle />
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
