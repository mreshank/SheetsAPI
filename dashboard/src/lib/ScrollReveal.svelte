<script lang="ts">
  import { onMount } from 'svelte';

  let {
    delay = 0,
    threshold = 0.15,
    direction = 'up',
    once = true,
    class: className = '',
    children
  }: {
    delay?: number;
    threshold?: number;
    direction?: 'up' | 'left' | 'right' | 'scale';
    once?: boolean;
    class?: string;
    children: any;
  } = $props();

  let el: HTMLDivElement;
  let revealed = $state(false);

  const dirClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale'
  }[direction];

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { revealed = true; }, delay);
          if (once) observer.unobserve(el);
        } else if (!once) {
          revealed = false;
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={el}
  class="{dirClass} {revealed ? 'revealed' : ''} {className}"
  style="transition-delay: {delay}ms"
>
  {@render children()}
</div>
