/** Deterministic pseudo-random (same output on server & client). */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function seededRange(seed: number, min: number, max: number): number {
  return min + seededRandom(seed) * (max - min);
}

export function createSeededParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededRange(i * 3 + 1, 0, 100),
    y: seededRange(i * 3 + 2, 0, 100),
    size: seededRange(i * 3 + 3, 2, 6),
    duration: seededRange(i * 5 + 4, 3, 7),
    delay: seededRange(i * 5 + 5, 0, 2),
  }));
}
