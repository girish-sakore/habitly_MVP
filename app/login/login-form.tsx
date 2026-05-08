"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, type FormEvent } from "react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email.");
      return;
    }
    setBusy(true);
    try {
      await signIn("email", { email: trimmed, callbackUrl });
    } catch {
      setError("Could not send link. Try again.");
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-xs flex-col gap-4"
    >
      <label className="sr-only" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-11 w-full rounded-md border border-neutral-300 bg-white px-3 text-[15px] text-neutral-900 outline-none ring-offset-2 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-100 dark:focus:ring-neutral-100/10"
      />
      {error ? (
        <p className="text-center text-sm text-rose-600 dark:text-rose-400" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="h-11 w-full rounded-md bg-neutral-900 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-70 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white"
      >
        {busy ? "Sending…" : "Send Magic Link"}
      </button>
    </form>
  );
}
