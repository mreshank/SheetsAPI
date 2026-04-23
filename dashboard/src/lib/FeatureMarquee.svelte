<script lang="ts">
  let {
    items = [] as string[],
    speed = 30,
    class: className = ''
  }: {
    items?: string[];
    speed?: number;
    class?: string;
  } = $props();

  // Double the items for seamless loop
  const doubled = [...items, ...items];
</script>

<div class="overflow-hidden {className}" style="mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);">
  <div class="marquee-track" style="animation-duration: {speed}s">
    {#each doubled as item}
      <span class="badge whitespace-nowrap">{item}</span>
    {/each}
  </div>
</div>
