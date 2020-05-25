<script>
  import { onMount } from 'svelte';
  import { analyser } from './synth.js';

  let canvas;
  onMount(() => {
    const ctx = canvas.getContext('2d');
    const data = new Uint8Array(analyser().fftSize);
    let raf;
    const draw = () => {
      analyser().getByteTimeDomainData(data);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      data.forEach((v, i) => {
        const x = (i / data.length) * canvas.width;
        const y = (v / 255) * canvas.height;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  });
</script>

<canvas bind:this={canvas} width="480" height="120"></canvas>
