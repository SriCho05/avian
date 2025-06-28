import { ClientRegistrationForm } from "@/components/auth/ClientRegistrationForm";
import { PlaneTakeoff } from "lucide-react";
import Link from "next/link";

export default function ClientRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center mb-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <PlaneTakeoff className="h-8 w-8 text-primary" />
            <span className="font-headline">Avian Pilot Portal</span>
          </Link>
        </div>
        <ClientRegistrationForm />
      </div>
    </div>
  );
}
