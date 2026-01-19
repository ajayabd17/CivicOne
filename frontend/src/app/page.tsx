import { ComplaintForm } from '../components/ComplaintForm';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            CivicOne
          </h1>
          <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
            Helping citizens reach the right government channel, the first time.
          </p>
        </header>

        <ComplaintForm />

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            CivicOne is an independent civic access platform and is not
            affiliated with the Government of India.
          </p>
        </footer>
      </div>
    </main>
  );
}
