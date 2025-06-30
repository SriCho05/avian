import { getSession } from "@/lib/session";
import { getJobsByClient } from "@/lib/sheets";
import { redirect } from "next/navigation";
import { MyJobsList } from "@/components/client/MyJobsList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function MyJobsPage() {
  const session = await getSession();
  if (!session?.user || session.user.role !== 'client') {
    redirect("/client/login");
  }

  const jobs = await getJobsByClient(session.user.email);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">My Posted Jobs</h1>
         <Button asChild>
            <Link href="/client/dashboard/post-job">Post Another Job</Link>
        </Button>
      </div>

      {jobs.length > 0 ? (
        <MyJobsList jobs={jobs} />
      ) : (
        <Alert>
          <Briefcase className="h-4 w-4" />
          <AlertTitle>You haven't posted any jobs yet.</AlertTitle>
          <AlertDescription>
            Click the "Post a New Job" button to create your first job listing.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
