export function ProgressBar({ value }: { value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
