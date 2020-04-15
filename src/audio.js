let ctx;

export function audio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

export const defaults = { attack: 0.01, decay: 0.15, sustain: 0.6, release: 0.3 };
export const filter = () => {
  const f = audio().createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = 2000;
  f.Q.value = 1;
  f.connect(audio().destination);
  return f;
};
