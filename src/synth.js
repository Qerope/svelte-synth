import { audio } from './audio.js';
import { defaults } from './audio.js';

export function midiToFreq(n) {
  return 440 * Math.pow(2, (n - 69) / 12);
}

const voices = new Map();

let out;
let fx;

export function noteOff(note) {
  const v = voices.get(note);
  if (!v) return;
  const ctx = audio();
  const rel = settings.release;
  v.gain.gain.cancelScheduledValues(ctx.currentTime);
  v.gain.gain.setValueAtTime(v.gain.gain.value, ctx.currentTime);
  v.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + rel);
  setTimeout(() => v.osc.stop(), rel * 1000);
  voices.delete(note);
}
