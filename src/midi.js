import { noteOn, noteOff } from './synth.js';

export async function initMidi() {
  if (!navigator.requestMIDIAccess) return false;
  const access = await navigator.requestMIDIAccess();
  const handle = (e) => {
    const [status, note, vel] = e.data;
    const cmd = status & 0xf0;
    if (cmd === 0x90 && vel > 0) noteOn(note);
    else if (cmd === 0x80 || cmd === 0x90) noteOff(note);
  };
  access.inputs.forEach((input) => { input.onmidimessage = handle; });
  return true;
}
