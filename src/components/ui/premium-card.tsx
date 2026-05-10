import Link from "next/link";

export function PremiumCard() {
  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Premium</p>
      <h3 className="mt-1 text-lg font-semibold text-foreground">Unlock full editions</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Go premium for deeper weekly interactions and expanded challenge units.
      </p>
      <Link
        href="/pricing"
        className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        View plans
      </Link>
    </section>
  );
}
