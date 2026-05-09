export function getProgressPercent(current: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, ((current + 1) / total) * 100);
}
