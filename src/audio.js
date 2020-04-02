let ctx;

export function audio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

export const defaults = { attack: 0.01, decay: 0.15, sustain: 0.6, release: 0.3 };
