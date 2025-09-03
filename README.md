# @temporalaitech/voice-metrics

Tiny, dependency-free audio feature helpers for Node & the Browser.

## Features
- `rms(buffer)` – root mean square loudness
- `peak(buffer)` – absolute peak
- `zeroCrossingRate(buffer)` – ZCR ∈ [0,1]
- `spectralCentroid(magnitudes, sampleRate)` – centroid in Hz
- `normalize(buffer, targetPeak=1.0)` – in-place peak normalization

## Install
```bash
npm i @temporalaitech/voice-metrics
# or
pnpm add @temporalaitech/voice-metrics

