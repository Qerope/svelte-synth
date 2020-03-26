import { audio } from './audio.js';

export function midiToFreq(n) {
  return 440 * Math.pow(2, (n - 69) / 12);
}

const voices = new Map();

export function noteOn(note) {
  if (voices.has(note)) return;
  const ctx = audio();
  const osc = ctx.createOscillator();
  osc.frequency.value = midiToFreq(note);
  osc.connect(ctx.destination);
  osc.start();
  voices.set(note, osc);
}

export function noteOff(note) {
  const osc = voices.get(note);
  if (!osc) return;
  osc.stop();
  voices.delete(note);
}
