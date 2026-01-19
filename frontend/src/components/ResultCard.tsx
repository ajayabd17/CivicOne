import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Info, ExternalLink } from 'lucide-react';

type ResultCardProps = {
  portal_name: string;
  portal_url: string;
  instructions: string;
  reasoning: string;
};

export function ResultCard({
  portal_name,
  portal_url,
  instructions,
  reasoning,
}: ResultCardProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{portal_name}</CardTitle>
          <CardDescription className="break-all pt-1 text-base text-primary hover:underline">
            <a href={portal_url} target="_blank" rel="noopener noreferrer">
              {portal_url}
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Instructions</h3>
            <p className="text-muted-foreground">{instructions}</p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold text-lg">Reasoning</h3>
            <p className="text-sm text-muted-foreground">{reasoning}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a href={portal_url} target="_blank" rel="noopener noreferrer">
              Go to official government portal{' '}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Important Disclaimer</AlertTitle>
        <AlertDescription>
          You are being redirected to an official government website. CivicOne
          does not file complaints or track their status.
        </AlertDescription>
      </Alert>
    </div>
  );
}
