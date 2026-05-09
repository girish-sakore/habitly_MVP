import type { ReactNode } from "react";

export function GameplayCard({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
      {children}
    </section>
  );
}
