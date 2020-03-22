import { audio } from './audio.js';

export function midiToFreq(n) {
  return 440 * Math.pow(2, (n - 69) / 12);
}

export function noteOn(note) {
  const ctx = audio();
  const osc = ctx.createOscillator();
  osc.frequency.value = midiToFreq(note);
  osc.connect(ctx.destination);
  osc.start();
  return osc;
}
