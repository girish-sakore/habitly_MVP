"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { FeedbackModal } from "@/components/feedback/feedback-modal";
import { InteractionRenderer } from "@/features/gameplay/renderer/interaction-renderer";
import { GameplayShell } from "@/features/gameplay/shell/gameplay-shell";
import { useGameplayStore } from "@/stores/gameplay-store";
import type { Edition } from "@/types/gameplay";

export function GameplayEngine({ edition }: { edition: Edition }) {
  const router = useRouter();

  const [feedback, setFeedback] = useState<{
    open: boolean;
    correct: boolean;
    message: string;
  }>({ open: false, correct: false, message: "" });

  const [retryCount, setRetryCount] = useState(0);

  const {
    currentStage,
    attemptsRemaining,
    score,
    completed,
    setAttempts,
    registerResult,
    nextStage,
    reset,
  } = useGameplayStore();

  const stage = edition.stages[currentStage];
  const totalAttempts = stage?.attemptsAllowed ?? 3;

  const progress = useMemo(
    () => (currentStage / edition.stages.length) * 100,
    [currentStage, edition.stages.length],
  );

  useEffect(() => {
    reset();
    setAttempts(edition.stages[0]?.attemptsAllowed ?? 0);
  }, [edition, reset, setAttempts]);

  function handleAnswer({
    correct,
    feedback: message,
  }: {
    correct: boolean;
    feedback: string;
  }) {
    registerResult({ correct, points: stage?.points ?? 0 });
    setFeedback({ open: true, correct, message });
  }

  function handleAutoContinue() {
    registerResult({ correct: true, points: stage?.points ?? 0 });
    setFeedback({
      open: true,
      correct: true,
      message: "Nice pace. Moving to the next challenge.",
    });
  }

  function handleRetry() {
    setRetryCount((c) => c + 1);
    setFeedback({ open: false, correct: false, message: "" });
  }

  function handleSkip() {
    setFeedback((s) => ({ ...s, open: false }));
    if (!stage) return;
    const nextIndex = currentStage + 1;
    const nextAttempts = edition.stages[nextIndex]?.attemptsAllowed ?? 0;
    nextStage(edition.stages.length, nextAttempts);
    if (nextIndex >= edition.stages.length) {
      router.push("/summary");
    }
  }

  function handleContinue() {
    setFeedback((s) => ({ ...s, open: false }));
    if (!stage) return;
  
    // Advance to next stage if: correct answer OR no attempts left OR
    // user chose "View Explanation" / "Continue Anyway" (wrong but wants to move on)
    const shouldAdvance = feedback.correct || attemptsRemaining <= 0;
  
    if (shouldAdvance) {
      const nextIndex = currentStage + 1;
      const nextAttempts = edition.stages[nextIndex]?.attemptsAllowed ?? 0;
      nextStage(edition.stages.length, nextAttempts);
      if (nextIndex >= edition.stages.length) {
        router.push("/summary");
      }
    }
    // If attemptsRemaining > 0 and wrong → modal just closes, interaction
    // resets via retryCount, user can try again manually without clicking Retry
  }

  if (completed || !stage) {
    router.push("/summary");
    return null;
  }

  return (
    <>
      <GameplayShell
        stageLabel={`Stage ${currentStage + 1} of ${edition.stages.length}`}
        progress={progress}
        attemptsRemaining={attemptsRemaining}
        totalAttempts={totalAttempts}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
          >
            <InteractionRenderer
              stage={stage}
              disabled={feedback.open}
              retryCount={retryCount}
              onAnswer={handleAnswer}
              onAutoContinue={handleAutoContinue}
            />
          </motion.div>
        </AnimatePresence>
      </GameplayShell>

      <FeedbackModal
        open={feedback.open}
        correct={feedback.correct}
        message={feedback.message}
        attemptsRemaining={attemptsRemaining}
        onContinue={handleContinue}
        onRetry={handleRetry}
        onSkip={handleSkip}
      />
    </>
  );
}