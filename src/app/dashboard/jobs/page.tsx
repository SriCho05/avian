import { getAllJobs } from "@/lib/sheets";
import { JobList } from "@/components/pilot/JobList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Briefcase } from "lucide-react";

export default async function BrowseJobsPage() {
  const jobs = await getAllJobs();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Browse Available Jobs</h1>
      {jobs.length > 0 ? (
        <JobList jobs={jobs} />
      ) : (
        <Alert>
            <Briefcase className="h-4 w-4" />
          <AlertTitle>No Jobs Available</AlertTitle>
          <AlertDescription>
            There are currently no open jobs. Please check back later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
