import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

type Job = {
    [key: string]: any;
};

export function MyJobsList({ jobs }: { jobs: Job[] }) {
    return (
        <div className="space-y-4">
            {jobs.map((job, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                             <Badge variant={job.status === 'Open' ? 'default' : 'secondary'} style={job.status === 'Open' ? { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' } : {}}>
                                {job.status}
                            </Badge>
                        </div>
                        <CardDescription>Posted on {format(new Date(job.postedAt), "PPP")}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                       <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span>{job.location}</span>
                        </div>
                         <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span>Required by: {format(new Date(job.requiredByDate), "PPP")}</span>
                        </div>
                        <div className="flex items-center text-sm font-semibold">
                            <DollarSign className="mr-2 h-4 w-4 flex-shrink-0" />
                            <span>Budget: ${job.budget}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" disabled>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                         <Button variant="destructive" size="sm" disabled>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
