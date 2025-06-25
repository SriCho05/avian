"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Plane, Shield, Languages, MapPin, CheckCircle } from "lucide-react";

interface User {
    [key: string]: any;
}

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push("/");
        router.refresh();
    };

    return (
        <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
    );
}


export function DashboardClient({ user }: { user: User }) {
    const getInitials = (name: string) => {
        if (!name) return "P";
        const names = name.split(' ');
        if (names.length > 1) {
            return names[0][0] + names[names.length - 1][0];
        }
        return name.substring(0, 2);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.fullName}`} />
                    <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold font-headline">Welcome, {user.fullName}!</h1>
                    <p className="text-muted-foreground">Here is your pilot profile overview.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p>
                            <strong>Location:</strong> {`${user.city ? user.city + ', ' : ''}${user.state}, ${user.country}`}
                        </p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader className="flex flex-row items-center gap-3">
                         <Shield className="w-6 h-6 text-primary"/>
                        <CardTitle>Pilot Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>License No:</strong> {user.licenseNumber}</p>
                        <p><strong>Experience:</strong> {user.experience} years</p>
                        <p><strong>Expertise:</strong> {user.expertise}</p>
                        <p><strong>Languages:</strong> {user.languages}</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader className="flex flex-row items-center gap-3">
                         <Plane className="w-6 h-6 text-primary"/>
                        <CardTitle>Drone & Equipment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Drone Type:</strong> {user.droneType}</p>
                        <p><strong>Model:</strong> {user.droneModel}</p>
                        <p><strong>Payload:</strong> {user.payloadCapabilities || "N/A"}</p>
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                    <CardHeader className="flex flex-row items-center gap-3">
                        <MapPin className="w-6 h-6 text-primary"/>
                        <CardTitle>Availability & Service Area</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Service Radius:</strong> {user.serviceRadius} miles</p>
                         <div className="flex items-center gap-2">
                            <strong>Willing to Travel:</strong>
                            <span className={`flex items-center gap-1 font-semibold ${user.willingToTravel ? 'text-green-600' : 'text-red-600'}`}>
                                <CheckCircle className="h-4 w-4" />
                                {user.willingToTravel ? "Yes" : "No"}
                            </span>
                        </div>
                        <p><strong>Availability:</strong> {user.availability}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
