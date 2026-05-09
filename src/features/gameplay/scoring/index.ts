export function scoreStage(basePoints: number, wasCorrect: boolean): number {
  return wasCorrect ? basePoints : 0;
}
