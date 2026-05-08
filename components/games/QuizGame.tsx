"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizGame as QuizGameData } from "@/data/mockGames";

export type QuizGameProps = Pick<QuizGameData, "title" | "description" | "config"> & {
  onComplete: () => void;
};

export function QuizGame({ title, description, config, onComplete }: QuizGameProps) {
  const { questions } = config;
  const [index, setIndex] = useState(0);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const emptyDoneRef = useRef(false);

  const question = questions[index];
  const isLast = questions.length > 0 && index === questions.length - 1;
  const answered = chosenId !== null;

  useEffect(() => {
    if (questions.length !== 0) return;
    if (emptyDoneRef.current) return;
    emptyDoneRef.current = true;
    onComplete();
  }, [questions.length, onComplete]);

  const goNext = useCallback(() => {
    setChosenId(null);
    if (isLast) {
      onComplete();
      return;
    }
    setIndex((i) => i + 1);
  }, [isLast, onComplete]);

  const onPick = useCallback((id: string) => {
    if (answered) return;
    setChosenId(id);
  }, [answered]);

  if (!question || questions.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 pb-10 pt-2 sm:px-5">
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Quiz · {index + 1}/{questions.length}
        </p>
        <h2 className="text-xl font-semibold leading-snug text-neutral-900 dark:text-neutral-50 sm:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
        ) : null}
      </header>

      <AnimatePresence mode="wait">
        <motion.article
          key={question.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="rounded-2xl border border-neutral-200/80 bg-neutral-50/80 p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-5"
        >
          <p className="text-lg font-medium leading-relaxed text-neutral-900 dark:text-neutral-50 sm:text-xl">
            {question.prompt}
          </p>
          {question.hint ? (
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">{question.hint}</p>
          ) : null}

          <ul className="mt-5 flex flex-col gap-3">
            {question.choices.map((choice) => {
              const selected = chosenId === choice.id;
              const reveal = answered;
              const thisCorrect = choice.id === question.correctChoiceId;
              const wrongPick = reveal && selected && !thisCorrect;

              let stateClass =
                "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-950/40 dark:hover:border-neutral-600";
              if (reveal && thisCorrect) {
                stateClass =
                  "border-emerald-500 bg-emerald-500/[0.12] ring-1 ring-emerald-500/30 dark:bg-emerald-500/15";
              } else if (wrongPick) {
                stateClass =
                  "border-rose-500 bg-rose-500/[0.10] ring-1 ring-rose-500/30 dark:bg-rose-500/12";
              } else if (selected && !reveal) {
                stateClass =
                  "border-neutral-900 dark:border-neutral-100";
              }

              return (
                <li key={choice.id}>
                  <motion.button
                    type="button"
                    layout
                    onClick={() => onPick(choice.id)}
                    disabled={answered}
                    whileTap={{ scale: answered ? 1 : 0.985 }}
                    className={`flex min-h-[3rem] w-full touch-manipulation rounded-xl border px-4 py-3 text-left text-[15px] font-medium transition-colors disabled:opacity-95 sm:min-h-[3.25rem] sm:text-base ${stateClass} ${
                      reveal ? "cursor-default" : "active:bg-neutral-100 dark:active:bg-neutral-900"
                    } text-neutral-900 dark:text-neutral-100`}
                  >
                    <span className="grow">{choice.text}</span>
                    {reveal && thisCorrect ? (
                      <span className="ml-3 shrink-0 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        Correct
                      </span>
                    ) : null}
                    {wrongPick ? (
                      <span className="ml-3 shrink-0 text-sm font-semibold text-rose-600 dark:text-rose-400">
                        Incorrect
                      </span>
                    ) : null}
                  </motion.button>
                </li>
              );
            })}
          </ul>

          <AnimatePresence>
            {answered && question.explanation ? (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
              >
                {question.explanation}
              </motion.p>
            ) : null}
          </AnimatePresence>

          {answered ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-11 w-full touch-manipulation items-center justify-center rounded-xl bg-neutral-900 px-4 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98] dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white"
              >
                {isLast ? "Finish" : "Next question"}
              </button>
            </motion.div>
          ) : null}
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
