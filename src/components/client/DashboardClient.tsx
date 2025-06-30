"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

interface User {
    [key: string]: any;
}

export function DashboardClient({ user }: { user: User }) {
    const getInitials = (name: string) => {
        if (!name) return "C";
        const names = name.split(' ');
        if (names.length > 1) {
            return names[0][0] + names[names.length - 1][0];
        }
        return name.substring(0, 2);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.fullName}`} />
                        <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Welcome, {user.fullName}!</h1>
                        <p className="text-muted-foreground">{user.companyName || 'Manage your drone service jobs here.'}</p>
                    </div>
                </div>
                 <Button size="lg" asChild>
                    <Link href="/client/dashboard/post-job">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Post a New Job
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>Ready to hire a professional drone pilot?</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Click the "Post a New Job" button to create a new listing. You'll be able to specify your project requirements, location, and budget to attract the best pilots from our verified network.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
