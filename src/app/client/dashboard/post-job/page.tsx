import { PostJobForm } from "@/components/client/PostJobForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PostJobPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <CardDescription>
            Fill out the details below to find the perfect drone pilot for your
            project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostJobForm />
        </CardContent>
      </Card>
    </div>
  );
}
