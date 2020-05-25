import { audio } from './audio.js';
import { defaults } from './audio.js';

export function midiToFreq(n) {
  return 440 * Math.pow(2, (n - 69) / 12);
}

const voices = new Map();

let out;
let fx;
let scope;

export function analyser() {
  if (!scope) {
    scope = audio().createAnalyser();
    scope.fftSize = 1024;
    scope.connect(audio().destination);
  }
  return scope;
}

export function noteOff(note) {
  const v = voices.get(note);
  if (!v) return;
  const ctx = audio();
  const t = ctx.currentTime;
  v.gain.gain.cancelScheduledValues(t);
  v.gain.gain.setValueAtTime(v.gain.gain.value, t);
  v.gain.gain.linearRampToValueAtTime(0, t + settings.release);
  v.osc.stop(t + settings.release + 0.05);
  voices.delete(note);
}
