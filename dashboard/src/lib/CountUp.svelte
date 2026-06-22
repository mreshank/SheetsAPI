<script lang="ts">
  import { onMount } from 'svelte';

  let {
    target,
    duration = 2000,
    suffix = '',
    prefix = '',
    class: className = ''
  }: {
    target: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    class?: string;
  } = $props();

  let el: HTMLSpanElement;
  let displayValue = $state(0);
  let started = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          animateCount();
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  });

  function animateCount() {
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      displayValue = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        displayValue = target;
      }
    }

    requestAnimationFrame(tick);
  }

  function formatNumber(n: number): string {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
    return n.toLocaleString();
  }
</script>

<span bind:this={el} class="font-display {className}">
  {prefix}{formatNumber(displayValue)}{suffix}
</span>
