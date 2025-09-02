export type NumericArray = ArrayLike<number>;

function toArray(a: NumericArray): number[] {
  return Array.prototype.slice.call(a as any);
}

export function rms(buffer: NumericArray): number {
  const arr = toArray(buffer);
  const sumSq = arr.reduce((acc, x) => acc + x * x, 0);
  return Math.sqrt(sumSq / (arr.length || 1));
}

export function peak(buffer: NumericArray): number {
  const arr = toArray(buffer);
  let m = 0;
  for (let i = 0; i < arr.length; i++) {
    const v = Math.abs(arr[i]);
    if (v > m) m = v;
  }
  return m;
}

export function zeroCrossingRate(buffer: NumericArray): number {
  const arr = toArray(buffer);
  if (arr.length <= 1) return 0;
  let zc = 0;
  for (let i = 1; i < arr.length; i++) {
    if ((arr[i - 1] >= 0 && arr[i] < 0) || (arr[i - 1] < 0 && arr[i] >= 0)) zc++;
  }
  return zc / (arr.length - 1);
}

/**
 * Spectral centroid (Hz).
 * Provide a real-valued magnitude spectrum (not waveform) and sampleRate.
 */
export function spectralCentroid(magnitudes: NumericArray, sampleRate: number): number {
  const mags = toArray(magnitudes);
  const n = mags.length;
  if (!n) return 0;
  // Bin freq spacing for an n-point FFT (one-sided spectrum length n)
  const binHz = sampleRate / (2 * n); // approximate for one-sided array
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    const f = i * binHz;
    const m = mags[i];
    num += f * m;
    den += m;
  }
  return den === 0 ? 0 : num / den;
}

/** Normalize array in-place to target peak (default 1.0). Returns scale applied. */
export function normalize(buffer: number[] | Float32Array, targetPeak = 1.0): number {
  const p = peak(buffer);
  if (p === 0) return 1;
  const scale = targetPeak / p;
  for (let i = 0; i < buffer.length; i++) buffer[i] *= scale;
  return scale;
}
