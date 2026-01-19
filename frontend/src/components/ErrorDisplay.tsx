'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from './ui/card';
import { AlertCircle } from 'lucide-react';

export function ErrorDisplay({ message }: { message: string }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="pt-4">An Error Occurred</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" onClick={() => router.back()} className="w-full">
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
