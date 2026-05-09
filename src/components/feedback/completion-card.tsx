import Link from "next/link";

export function CompletionCard({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Edition Complete
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">Final score: {score}</p>
      <div className="mt-5 flex flex-col gap-2">
        <Link
          href="/summary"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
        >
          View summary
        </Link>
        <Link
          href="/profile"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border text-sm font-semibold"
        >
          Profile
        </Link>
      </div>
    </section>
  );
}
