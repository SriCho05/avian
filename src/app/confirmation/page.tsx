import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: 'hsl(var(--accent) / 0.3)' }}>
            <CheckCircle2 className="h-10 w-10" style={{ color: 'hsl(var(--accent-foreground))' }} />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Registration Submitted!</CardTitle>
          <CardDescription>Thank you for joining Avian Pilot Portal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your profile has been submitted for review. We will notify you via email once your profile has been approved. This process usually takes 2-3 business days.
          </p>
          <Button asChild className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
