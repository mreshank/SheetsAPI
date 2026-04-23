<script lang="ts">
  let {
    class: className = '',
    maxTilt = 4,
    glare = false,
    children
  }: {
    class?: string;
    maxTilt?: number;
    glare?: boolean;
    children: any;
  } = $props();

  let card: HTMLDivElement;
  let transform = $state('');
  let glareStyle = $state('');

  function handleMouseMove(e: MouseEvent) {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (0.5 - y) * maxTilt;
    const tiltY = (x - 0.5) * maxTilt;

    transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glare) {
      const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90;
      glareStyle = `background: linear-gradient(${angle}deg, rgba(255,255,255,0.08) 0%, transparent 60%)`;
    }
  }

  function handleMouseLeave() {
    transform = '';
    glareStyle = '';
  }
</script>

<div class="card-3d {className}">
  <div
    bind:this={card}
    class="card-3d-inner"
    style:transform
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    role="presentation"
  >
    {@render children()}
    {#if glare && glareStyle}
      <div
        class="absolute inset-0 pointer-events-none"
        style={glareStyle}
      ></div>
    {/if}
  </div>
</div>
