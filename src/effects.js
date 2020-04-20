import { audio } from './audio.js';

export function createDelay(destination) {
  const ctx = audio();
  const input = ctx.createGain();
  const delay = ctx.createDelay(1.0);
  const feedback = ctx.createGain();
  const wet = ctx.createGain();
  delay.delayTime.value = 0.3;
  feedback.gain.value = 0.35;
  wet.gain.value = 0.25;
  input.connect(destination);
  input.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(destination);
  return { input, delay, feedback, wet };
}
