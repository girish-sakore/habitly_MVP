import type { ReactNode } from "react";

type ChoiceCardProps = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};

export function ChoiceCard({ onClick, disabled, children }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl border border-border bg-white p-3 text-left shadow-sm transition active:scale-[0.98] disabled:opacity-70"
    >
      {children}
    </button>
  );
}
