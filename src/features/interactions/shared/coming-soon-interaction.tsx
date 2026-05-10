import { GameplayCard } from "@/components/ui/gameplay-card";

export function ComingSoonInteraction({
  type,
  prompt,
  onContinue,
}: {
  type: string;
  prompt: string;
  onContinue: () => void;
}) {
  return (
    <GameplayCard>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{type}</p>
      <p className="mt-2 text-sm text-foreground">{prompt}</p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-4 h-10 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        Continue
      </button>
    </GameplayCard>
  );
}
