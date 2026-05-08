"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("No window"));
  }
  if (window.Razorpay) {
    return Promise.resolve();
  }
  const existing = document.querySelector(
    'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Razorpay script failed")), {
        once: true,
      });
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Razorpay"));
    document.body.appendChild(script);
  });
}

export function Paywall({
  onUnlockSuccess,
  prefillEmail,
}: {
  onUnlockSuccess?: () => void;
  prefillEmail?: string | null;
}) {
  const [phase, setPhase] = useState<"idle" | "loading" | "checkout">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const resetMessage = useCallback(() => setMessage(null), []);

  const checkout = useCallback(async () => {
    setPhase("loading");
    setMessage(null);
    try {
      await loadRazorpayScript();
      if (!window.Razorpay) {
        throw new Error("Razorpay unavailable.");
      }

      const res = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = (await res.json()) as {
        error?: string;
        orderId?: string;
        amount?: number | string;
        currency?: string;
        keyId?: string;
      };

      if (!res.ok) {
        throw new Error(data.error ?? "Could not create order.");
      }

      const { orderId, amount, currency, keyId } = data;
      if (!orderId || amount == null || !currency || !keyId) {
        throw new Error("Invalid response from payment server.");
      }

      const amt =
        typeof amount === "number" ? amount : Number.parseInt(amount, 10);
      if (!Number.isFinite(amt)) {
        throw new Error("Bad amount.");
      }

      const rzp = new window.Razorpay({
        key: keyId,
        amount: String(amt),
        currency,
        name: "Nugget",
        description: "Full access • keep playing weekly sets.",
        order_id: orderId,
        prefill:
          typeof prefillEmail === "string" && prefillEmail.length > 0
            ? { email: prefillEmail }
            : undefined,
        theme: { color: "#111111" },
        modal: {
          ondismiss: () => setPhase("idle"),
        },
        handler: async (response) => {
          setPhase("loading");
          setMessage(null);

          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const v = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(
                typeof v.error === "string" ? v.error : "Verification failed."
              );
            }

            setPhase("idle");
            onUnlockSuccess?.();
          } catch (err) {
            console.error("[paywall]", err);
            const msg =
              err instanceof Error ? err.message : "Verification failed.";
            setMessage(msg);
            setPhase("idle");
          }
        },
      });

      rzp.on("payment.failed", (ev) => {
        const hint = ev?.error?.description ?? "Payment did not complete.";
        setMessage(hint);
        setPhase("idle");
      });

      rzp.open();
      setPhase("checkout");
    } catch (e) {
      console.error("[paywall checkout]", e);
      const hint = e instanceof Error ? e.message : "Something went wrong.";
      setMessage(hint);
      setPhase("idle");
    }
  }, [onUnlockSuccess, prefillEmail]);

  return (
    <div className="w-full max-w-[22rem] border border-neutral-900/95 bg-[#fbfbf7] px-7 py-10 text-neutral-950 shadow-[0_24px_40px_-32px_rgba(0,0,0,0.45)] dark:border-neutral-100/35 dark:bg-[#141413] dark:text-[#ecebe5] dark:shadow-[0_28px_50px_-40px_rgba(0,0,0,0.85)] sm:max-w-[24rem] sm:py-11">
      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-neutral-700 dark:text-neutral-400">
        Subscriber crossword
      </p>
      <h2 className="mt-4 font-[Georgia,Cambria,Times_New_Roman,Times,serif] text-[1.625rem] font-normal leading-snug tracking-[-0.02em] sm:text-[1.75rem]">
        The rest of today&apos;s set is reserved for members.
      </h2>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-neutral-700 dark:text-neutral-400">
        Finish the final game and every new week on any device. One purchase
        unlocks the full schedule.
      </p>

      <div className="my-7 h-px w-full bg-neutral-900/10 dark:bg-neutral-100/10" />

      <ul className="space-y-3 font-[Georgia,Cambria,Times_New_Roman,Times,serif] text-[0.9375rem] leading-snug text-neutral-800 dark:text-neutral-300">
        <li className="flex gap-2">
          <span className="mt-[0.35em] h-1 w-1 shrink-0 rounded-full bg-neutral-900 dark:bg-neutral-200" />
          Themed weeks, three games each — play at your pace.
        </li>
        <li className="flex gap-2">
          <span className="mt-[0.35em] h-1 w-1 shrink-0 rounded-full bg-neutral-900 dark:bg-neutral-200" />
          Clean, print-adjacent layout — no clutter in the margins.
        </li>
        <li className="flex gap-2">
          <span className="mt-[0.35em] h-1 w-1 shrink-0 rounded-full bg-neutral-900 dark:bg-neutral-200" />
          Secure checkout with Razorpay (cards, UPI, wallets).
        </li>
      </ul>

      {message ? (
        <p
          className="mt-6 text-center text-[0.8125rem] leading-relaxed text-rose-700 dark:text-rose-300"
          role="alert"
        >
          {message}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          disabled={phase === "loading" || phase === "checkout"}
          onClick={() => {
            resetMessage();
            void checkout();
          }}
          className="inline-flex h-12 w-full touch-manipulation items-center justify-center rounded-full bg-neutral-950 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-[#fbfbf7] transition hover:bg-neutral-800 active:scale-[0.99] disabled:cursor-wait disabled:opacity-80 dark:bg-[#f4f3ef] dark:text-neutral-950 dark:hover:bg-white"
        >
          {phase === "loading"
            ? "Please wait…"
            : phase === "checkout"
              ? "Complete payment…"
              : "Unlock now"}
        </button>
        <p className="text-center text-[0.6875rem] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-500">
          One-time access · priced in INR
        </p>
        <Link
          href="/"
          onClick={resetMessage}
          className="text-center text-[0.8125rem] font-medium text-neutral-700 underline decoration-neutral-400 underline-offset-4 transition hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
}
