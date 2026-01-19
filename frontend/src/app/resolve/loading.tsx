export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-4 bg-background p-4 text-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
        role="status"
        aria-label="Loading"
      ></div>
      <p className="text-lg text-muted-foreground">
        Finding the right government portal…
      </p>
    </div>
  );
}
