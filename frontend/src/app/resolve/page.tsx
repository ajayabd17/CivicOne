'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { ResultCard } from '../../components/ResultCard';
import { ErrorDisplay } from '../../components/ErrorDisplay';
import Loading from './loading';

type PortalResult = {
  portal_id: number;
  portal_name: string;
  portal_url: string;
  instructions: string;
  reasoning: string;
};

function ResolvePageContent() {
  const searchParams = useSearchParams();
  const state = searchParams.get('state');
  const issue_text = searchParams.get('issue') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<PortalResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!state) {
      setError('State is missing. Please go back and select a state.');
      setIsLoading(false);
      return;
    }

    const fetchPortal = async () => {
      setIsLoading(true);
      setError(null);
      setResult(null);

      try {
        const response = await fetch('/api/resolve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state, issue_text }),
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No official portal found for this state yet.');
          } else {
            throw new Error('Temporary issue. Please try again.');
          }
        }

        const data: PortalResult = await response.json();
        setResult(data);
      } catch (e: any) {
        setError(e.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortal();
  }, [state, issue_text]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (result) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-2xl space-y-8">
          <header className="text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              We found the right government portal for your issue
            </h1>
          </header>
          <ResultCard {...result} />
        </div>
      </main>
    );
  }

  return null;
}

export default function ResolvePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResolvePageContent />
    </Suspense>
  );
}
