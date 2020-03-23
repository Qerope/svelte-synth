<script>
  import { noteOn, noteOff } from './synth.js';

  const KEYS = 'awsedftgyhujkolp;'.split('');
  const BASE = 60;
  const down = new Set();

  function onKeyDown(e) {
    const i = KEYS.indexOf(e.key);
    if (i < 0 || e.repeat) return;
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
</main>

<style>
  main { font-family: sans-serif; max-width: 480px; margin: 2rem auto; }
</style>
