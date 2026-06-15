"use client";

import { useRouter } from "next/navigation";
import type { Edition } from "@/types/gameplay";

interface EditionCtaProps {
  edition: Edition;
}

export function EditionCta({ edition }: EditionCtaProps) {
  const router = useRouter();

  function handleStart() {
    router.push(`/edition/${edition.id}`);
  }

  return (
    <section className="flex flex-col items-center gap-4">
      <button
        onClick={handleStart}
        className="w-full rounded-2xl text-[18px] font-bold flex items-center justify-center gap-3 transition-all duration-75 active:translate-y-0.5"
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--secondary-foreground)",
          boxShadow: "0 4px 0 0 #2a4d41",
          padding: "20px 48px",
        }}
      >
        Start Session
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 24,
            fontVariationSettings: "'FILL' 1",
          }}
        >
          play_arrow
        </span>
      </button>
      <p
        className="text-[11px] font-bold tracking-widest uppercase"
        style={{ color: "var(--on-surface-variant)", opacity: 0.6 }}
      >
        Tap to begin your rhythm
      </p>
    </section>
  );
}