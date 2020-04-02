import { audio } from './audio.js';
import { defaults } from './audio.js';

export function midiToFreq(n) {
  return 440 * Math.pow(2, (n - 69) / 12);
}

const voices = new Map();

export const settings = { ...defaults, wave: 'sawtooth' };

export function noteOn(note) {
  if (voices.has(note)) return;
  const ctx = audio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  osc.type = settings.wave;
  osc.frequency.value = midiToFreq(note);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(1, now + settings.attack);
  gain.gain.linearRampToValueAtTime(settings.sustain, now + settings.attack + settings.decay);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  voices.set(note, { osc, gain });
}

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
