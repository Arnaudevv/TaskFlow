export function getElapsedSeconds(startTime: string, endTime: number): number {
  const start = new Date(startTime).getTime();

  if (!Number.isFinite(start) || !Number.isFinite(endTime)) return 0;

  return Math.max(0, Math.floor((endTime - start) / 1000));
}
