import Link from "next/link";
import { PlaneTakeoff, Briefcase } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ClientDashboardLayout({
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
            <span className="font-headline">Avian Client Portal</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="outline" asChild>
                <Link href="/client/dashboard/jobs">
                    <Briefcase className="mr-2 h-4 w-4" />
                    My Jobs
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

// NOTE: I've added a placeholder button and component imports that may not be used yet.
// This is to prepare for future functionality like job posting.
import { Button } from "@/components/ui/button";
