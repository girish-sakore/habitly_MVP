"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, type PanInfo } from "framer-motion";
import type { SwipeGame as SwipeGameData } from "@/data/mockGames";

export type SwipeGameProps = Pick<
  SwipeGameData,
  "title" | "description" | "config"
> & {
  onComplete: () => void;
};

const SWIPE_NEED = 72;
const VELOCITY_NEED = 450;

export function SwipeGame({ title, description, config, onComplete }: SwipeGameProps) {
  const { cards, instructions } = config;
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const emptyDoneRef = useRef(false);
  const card = cards[index];

  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-200, 200], [-8, 8]);
  const rotate = useTransform(rotateRaw, (r) => (feedback !== "idle" ? 0 : r));
  const trueOpacity = useTransform(x, [0, 48], [0.35, 1]);
  const falseOpacity = useTransform(x, [-48, 0], [1, 0.35]);

  const isLast = index === cards.length - 1;

  useEffect(() => {
    if (cards.length !== 0) return;
    if (emptyDoneRef.current) return;
    emptyDoneRef.current = true;
    onComplete();
  }, [cards.length, onComplete]);

  useEffect(() => {
    x.set(0);
    setFeedback("idle");
  }, [index, x]);

  const advance = useCallback(() => {
    setFeedback("idle");
    x.set(0);
    if (isLast) {
      onComplete();
      return;
    }
    setIndex((i) => i + 1);
  }, [isLast, onComplete, x]);

  const commitDirection = useCallback(
    (dir: "left" | "right") => {
      if (feedback !== "idle" || !card) return;
      const correct = dir === card.correctSwipe;
      setFeedback(correct ? "correct" : "wrong");
      const exit = dir === "right" ? 380 : -380;

      animate(x, exit, {
        type: "spring",
        stiffness: 300,
        damping: 28,
      }).then(() => {
        const pause = correct ? 220 : 480;
        window.setTimeout(() => {
          advance();
        }, pause);
      });
    },
    [advance, card, feedback, x]
  );

  const onDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (feedback !== "idle" || !card) return;

      const dx = info.offset.x;
      const vx = info.velocity.x;
      let dir: "left" | "right" | null = null;
      if (dx >= SWIPE_NEED || vx >= VELOCITY_NEED) dir = "right";
      else if (dx <= -SWIPE_NEED || vx <= -VELOCITY_NEED) dir = "left";

      if (!dir) {
        animate(x, 0, { type: "spring", stiffness: 420, damping: 36 });
        return;
      }

      commitDirection(dir);
    },
    [card, commitDirection, feedback, x]
  );

  if (cards.length === 0 || !card) {
    return null;
  }

  const tone =
    feedback === "correct"
      ? "shadow-emerald-500/35 ring-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/15"
      : feedback === "wrong"
        ? "shadow-rose-500/35 ring-rose-500/40 bg-rose-500/10 dark:bg-rose-500/15"
        : "border-neutral-200/90 bg-white shadow-neutral-900/10 dark:border-neutral-800 dark:bg-neutral-950/80";

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-5 px-4 pb-10 pt-2 sm:px-5">
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          True / False · {index + 1}/{cards.length}
        </p>
        <h2 className="text-xl font-semibold leading-snug text-neutral-900 dark:text-neutral-50 sm:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
        ) : null}
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          {instructions ??
            "Drag the card toward False (left) or True (right), then release."}
        </p>
      </header>

      <div className="relative isolate flex min-h-[min(420px,calc(100dvh-12rem))] flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 sm:text-xs">
          <motion.span style={{ opacity: falseOpacity }} className="text-rose-600 dark:text-rose-400">
            ← False
          </motion.span>
          <motion.span style={{ opacity: trueOpacity }} className="text-emerald-600 dark:text-emerald-400">
            True →
          </motion.span>
        </div>

        <div className="relative flex flex-1 items-center justify-center px-1">
          <div
            className="pointer-events-none absolute inset-x-2 top-1/2 h-px -translate-y-6 bg-gradient-to-r from-rose-500/0 via-neutral-200 to-emerald-500/0 dark:via-neutral-700"
            aria-hidden
          />
          <motion.div
            key={card.id}
            style={{ x, rotate }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.85}
            onDragEnd={onDragEnd}
            whileDrag={{ cursor: "grabbing" }}
            className={`relative z-10 w-full max-w-sm cursor-grab touch-none rounded-3xl border p-5 shadow-lg ring-1 ring-inset ${tone} sm:p-6`}
          >
            <p className="text-center text-[17px] font-medium leading-relaxed text-neutral-900 dark:text-neutral-50 sm:text-lg">
              {card.body}
            </p>
            {feedback !== "idle" ? (
              <p
                className={`mt-4 text-center text-sm font-semibold ${
                  feedback === "correct"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {feedback === "correct"
                  ? "Nice — matched the key."
                  : `Not quite — the answer was ${card.correctSwipe === "right" ? "True" : "False"}.`}
              </p>
            ) : null}
            <p className="mt-3 text-center text-xs text-neutral-500 dark:text-neutral-400">
              Swipe horizontally to answer
            </p>
          </motion.div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            disabled={feedback !== "idle"}
            onClick={() => commitDirection("left")}
            className="h-12 flex-1 touch-manipulation rounded-2xl border border-rose-200 bg-rose-50 text-sm font-semibold text-rose-800 transition hover:bg-rose-100 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-100 dark:hover:bg-rose-950/70"
          >
            False
          </button>
          <button
            type="button"
            disabled={feedback !== "idle"}
            onClick={() => commitDirection("right")}
            className="h-12 flex-1 touch-manipulation rounded-2xl border border-emerald-200 bg-emerald-50 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 dark:border-emerald-900 dark:bg-emerald-950/45 dark:text-emerald-50 dark:hover:bg-emerald-950/65"
          >
            True
          </button>
        </div>
      </div>
    </div>
  );
}
