<script lang="ts">
  import { onMount } from 'svelte';

  let {
    lines = [] as { prompt?: string; command?: string; output?: string[] }[],
    typingSpeed = 40,
    lineDelay = 600,
    class: className = ''
  }: {
    lines?: { prompt?: string; command?: string; output?: string[] }[];
    typingSpeed?: number;
    lineDelay?: number;
    class?: string;
  } = $props();

  let visibleLines = $state<{ type: 'cmd' | 'output'; text: string; prompt?: string }[]>([]);
  let currentTyping = $state('');
  let showCursor = $state(true);
  let isTyping = $state(false);

  onMount(() => {
    animateTerminal();
  });

  async function animateTerminal() {
    for (const line of lines) {
      if (line.command) {
        isTyping = true;
        currentTyping = '';
        const prompt = line.prompt ?? '$ ';

        // Type out the command character by character
        for (let i = 0; i < line.command.length; i++) {
          currentTyping = prompt + line.command.slice(0, i + 1);
          await sleep(typingSpeed + Math.random() * 30);
        }

        // Move typed line to visible
        visibleLines = [...visibleLines, { type: 'cmd', text: line.command, prompt }];
        currentTyping = '';
        isTyping = false;

        await sleep(lineDelay);
      }

      if (line.output) {
        for (const outputLine of line.output) {
          visibleLines = [...visibleLines, { type: 'output', text: outputLine }];
          await sleep(80);
        }
        await sleep(lineDelay);
      }
    }
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
</script>

<div class="terminal {className}">
  <div class="terminal-header">
    <span class="terminal-dot"></span>
    <span class="terminal-dot"></span>
    <span class="terminal-dot"></span>
    <span style="margin-left: 8px; font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1px;">terminal</span>
  </div>
  <div class="terminal-body">
    {#each visibleLines as line}
      <div>
        {#if line.type === 'cmd'}
          <span class="terminal-prompt">{line.prompt}</span>{line.text}
        {:else}
          <span style="color: rgba(255,255,255,0.6)">{line.text}</span>
        {/if}
      </div>
    {/each}
    {#if currentTyping}
      <div>
        <span class="terminal-prompt">{currentTyping.split(' ')[0]} </span>{currentTyping.slice(currentTyping.indexOf(' ') + 1)}<span class="terminal-cursor"></span>
      </div>
    {:else if showCursor}
      <div>
        <span class="terminal-prompt">$ </span><span class="terminal-cursor"></span>
      </div>
    {/if}
  </div>
</div>
