<script>
  import { noteOn, noteOff } from './synth.js';

  const KEYS = 'awsedftgyhujkolp;'.split('');
  const BASE = 60;
  const down = new Set();
  import { settings } from './synth.js';
  let wave = settings.wave;
  $: settings.wave = wave;
  let cutoff = 2000;
  let delayMix = 0.25;
  import { onMount } from 'svelte';
  import { initMidi } from './midi.js';
  let midiOk = false;
  onMount(async () => { midiOk = await initMidi(); });
  import Scope from './Scope.svelte';

  function onKeyDown(e) {
    const i = KEYS.indexOf(e.key);
    if (i < 0 || e.repeat) return;
    if (down.has(i)) return;
    down.add(i);
    noteOn(BASE + i);
  }

  function onKeyUp(e) {
    const i = KEYS.indexOf(e.key);
    if (i < 0) return;
    down.delete(i);
    noteOff(BASE + i);
  }
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<main>
  <h1>svelte-synth</h1>
  <p>Play with a-p on the home row.</p>
  <label>Wave
    <select bind:value={wave}>
      <option>sine</option>
      <option>square</option>
      <option>sawtooth</option>
      <option>triangle</option>
    </select>
  </label>
  <label>Cutoff
    <input type="range" min="100" max="8000" bind:value={cutoff}>
  </label>
  <label>Delay mix
    <input type="range" min="0" max="1" step="0.05" bind:value={delayMix}>
  </label>
  <p>{midiOk ? 'MIDI input connected' : 'No MIDI input'}</p>
  <Scope />
</main>

<style>
  main { font-family: sans-serif; max-width: 480px; margin: 2rem auto; }
</style>
