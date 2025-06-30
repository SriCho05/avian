import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";

type Job = {
    [key: string]: any;
};

export function JobList({ jobs }: { jobs: Job[] }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => (
                <Card key={index} className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                             <Badge variant={job.status === 'Open' ? 'default' : 'secondary'} style={job.status === 'Open' ? { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' } : {}}>
                                {job.status}
                            </Badge>
                        </div>
                        <CardDescription>Posted on {format(new Date(job.postedAt), "PPP")}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <p className="text-muted-foreground line-clamp-3">{job.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{job.location}</span>
                        </div>
                         <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Required by: {format(new Date(job.requiredByDate), "PPP")}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div className="text-lg font-bold">
                            <DollarSign className="inline-block mr-1 h-5 w-5 text-primary" />
                            {job.budget}
                        </div>
                        <Button>View & Apply</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
