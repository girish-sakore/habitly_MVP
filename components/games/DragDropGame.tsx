"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, AnimatePresence, type PanInfo } from "framer-motion";
import type { DragDropGame as DragDropGameData } from "@/data/mockGames";

export type DragDropGameProps = Pick<
  DragDropGameData,
  "title" | "description" | "config"
> & {
  onComplete: () => void;
};

type Placements = Record<string, string | null>;

function pointerFromDragEnd(
  event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo
): { x: number; y: number } {
  const maybe = info as { point?: { x: number; y: number } };
  if (
    maybe.point &&
    typeof maybe.point.x === "number" &&
    typeof maybe.point.y === "number"
  ) {
    return maybe.point;
  }
  if ("clientX" in event) {
    const pe = event as PointerEvent;
    return { x: pe.clientX, y: pe.clientY };
  }
  return { x: 0, y: 0 };
}

export function DragDropGame({ title, description, config, onComplete }: DragDropGameProps) {
  const { targets, items, instructions, layout: layoutHint } = config;
  const emptyDoneRef = useRef(false);

  const [placements, setPlacements] = useState<Placements>(() =>
    Object.fromEntries(items.map((i) => [i.id, null as string | null]))
  );
  const [flash, setFlash] = useState<{ targetId: string; ok: boolean } | null>(null);
  const targetRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (items.length !== 0 && targets.length !== 0) return;
    if (emptyDoneRef.current) return;
    emptyDoneRef.current = true;
    onComplete();
  }, [items.length, targets.length, onComplete]);

  const pool = items.filter((i) => placements[i.id] === null);

  const allFilled = pool.length === 0;
  const allCorrect = items.every(
    (i) => placements[i.id] !== null && placements[i.id] === i.matchTargetId
  );

  useEffect(() => {
    if (!allFilled || !allCorrect) return;
    const t = window.setTimeout(onComplete, 420);
    return () => window.clearTimeout(t);
  }, [allCorrect, allFilled, onComplete]);

  const hitTarget = useCallback(
    (px: number, py: number): string | undefined => {
      for (const tgt of targets) {
        const el = targetRefs.current[tgt.id];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const pad = 10;
        if (
          px >= r.left - pad &&
          px <= r.right + pad &&
          py >= r.top - pad &&
          py <= r.bottom + pad
        ) {
          return tgt.id;
        }
      }
      return undefined;
    },
    [targets]
  );

  const onItemDragEnd = useCallback(
    (
      itemId: string,
      matchTargetId: string,
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      const { x, y } = pointerFromDragEnd(event, info);
      const hit = hitTarget(x, y);
      if (!hit) return;

      if (hit === matchTargetId) {
        setPlacements((prev) => ({ ...prev, [itemId]: hit }));
        setFlash({ targetId: hit, ok: true });
        window.setTimeout(() => setFlash(null), 480);
      } else {
        setFlash({ targetId: hit, ok: false });
        window.setTimeout(() => setFlash(null), 480);
      }
    },
    [hitTarget]
  );

  if (items.length === 0 || targets.length === 0) {
    return null;
  }

  const twoCol = layoutHint === "two-column";

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-5 px-4 pb-12 pt-2 sm:px-5">
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Sort · {targets.length} groups
        </p>
        <h2 className="text-xl font-semibold leading-snug text-neutral-900 dark:text-neutral-50 sm:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
        ) : null}
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          {instructions ??
            "Drag each label into the group it belongs with. Loose drops snap back."}
        </p>
      </header>

      <LayoutGroup id="drag-drop-groups">
        <div className={`flex flex-col gap-4 ${twoCol ? "sm:grid sm:grid-cols-2 sm:gap-3" : ""}`}>
          {targets.map((tgt) => {
            const placedHere = items.filter((i) => placements[i.id] === tgt.id);
            const fl = flash?.targetId === tgt.id;

            return (
              <section
                key={tgt.id}
                ref={(el) => {
                  targetRefs.current[tgt.id] = el;
                }}
                className={`min-h-[4.75rem] rounded-2xl border bg-neutral-50/90 p-3 transition-colors dark:bg-neutral-900/50 sm:p-4 ${
                  fl && flash?.ok
                    ? "border-emerald-500 ring-2 ring-emerald-500/25"
                    : fl && flash && !flash.ok
                      ? "border-rose-500 ring-2 ring-rose-500/25"
                      : "border-neutral-200/90 dark:border-neutral-800"
                }`}
              >
                <p className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  {tgt.label}
                </p>
                <div className="flex min-h-[2.75rem] flex-wrap content-start gap-2">
                  <AnimatePresence>
                    {placedHere.map((item) => (
                      <motion.span
                        key={item.id}
                        layout
                        layoutId={`dd-chip-${item.id}`}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        className="rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm dark:bg-neutral-100 dark:text-neutral-900"
                      >
                        {item.label}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                  {placedHere.length === 0 ? (
                    <span className="pointer-events-none self-center py-3 text-[13px] text-neutral-400 dark:text-neutral-500">
                      Drop matches here
                    </span>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 bg-white/70 p-3 dark:border-neutral-700 dark:bg-neutral-950/40 sm:p-4">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Your labels
          </p>
          {pool.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-4 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400"
            >
              {allCorrect ? "All sorted — great work." : "Keep going…"}
            </motion.p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {pool.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  layoutId={`dd-chip-${item.id}`}
                  drag
                  dragElastic={0.12}
                  dragMomentum={false}
                  whileDrag={{ scale: 1.04, zIndex: 30, cursor: "grabbing" }}
                  onDragEnd={(e, info) => onItemDragEnd(item.id, item.matchTargetId, e, info)}
                  className="cursor-grab touch-none rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 shadow-sm active:cursor-grabbing dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                >
                  {item.label}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </LayoutGroup>
    </div>
  );
}
