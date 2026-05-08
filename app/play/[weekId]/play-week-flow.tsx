"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Week, Game } from "@/data/mockGames";

import { Paywall } from "@/components/Paywall";
import { QuizGame } from "@/components/games/QuizGame";
import { SwipeGame } from "@/components/games/SwipeGame";
import { DragDropGame } from "@/components/games/DragDropGame";

export function PlayWeekFlow({
  week,
  isPremium,
  prefillEmail,
}: {
  week: Week;
  isPremium: boolean;
  prefillEmail?: string | null;
}) {
  const router = useRouter();
  const games = useMemo(
    () =>
      [...week.games].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      ),
    [week.games]
  );

  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const total = games.length;
  const done = total > 0 && currentGameIndex >= total;
  const showPaywall = currentGameIndex === 2 && !isPremium;
  const currentGame = games[currentGameIndex];

  const progressPercent =
    total === 0
      ? 0
      : done
        ? 100
        : Math.min(100, ((currentGameIndex + 1) / total) * 100);

  const subtitle = done
    ? "Done"
    : showPaywall
      ? "Locked"
      : `Game ${Math.min(currentGameIndex + 1, total)} of ${total}`;

  const onGameComplete = () => {
    setCurrentGameIndex((i) => Math.min(i + 1, total));
  };

  function renderGame(game: Game) {
    switch (game.type) {
      case "quiz":
        return (
          <QuizGame
            title={game.title}
            description={game.description}
            config={game.config}
            onComplete={onGameComplete}
          />
        );
      case "swipe":
        return (
          <SwipeGame
            title={game.title}
            description={game.description}
            config={game.config}
            onComplete={onGameComplete}
          />
        );
      case "drag-drop":
        return (
          <DragDropGame
            title={game.title}
            description={game.description}
            config={game.config}
            onComplete={onGameComplete}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-20 border-b border-neutral-200/80 bg-background/90 px-4 py-3 backdrop-blur-md dark:border-neutral-800">
        <div className="mx-auto flex max-w-lg flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4 text-neutral-900 dark:text-neutral-100">
            <h1 className="truncate text-sm font-semibold sm:text-base">{week.title}</h1>
            <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 sm:text-xs">
              {subtitle}
            </span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-neutral-200/90 dark:bg-neutral-800"
            role="progressbar"
            aria-valuenow={Math.round(progressPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={subtitle}
          >
            <div
              className="h-full rounded-full bg-neutral-900 transition-[width] duration-300 ease-out dark:bg-neutral-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      <main
        className={`flex flex-1 flex-col items-center px-0 pt-4 sm:pt-8 ${
          total === 0 || done || showPaywall ? "justify-center pb-24" : "justify-start"
        }`}
      >
        {total === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Nothing to play yet.</p>
        ) : done ? (
          <div className="flex flex-col items-center gap-6 px-4 text-center">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Finished
              </p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {week.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                You&apos;ve cleared all games this week.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-xl bg-neutral-900 px-6 text-sm font-semibold text-white dark:bg-neutral-100 dark:text-neutral-950"
            >
              Back home
            </Link>
          </div>
        ) : showPaywall ? (
          <Paywall
            prefillEmail={prefillEmail}
            onUnlockSuccess={() => router.refresh()}
          />
        ) : currentGame ? (
          <div className="w-full flex-1">{renderGame(currentGame)}</div>
        ) : null}
      </main>
    </div>
  );
}
