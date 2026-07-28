<script>
    import { onMount } from 'svelte';

    let { bgMusicUrl = '', isPlaying = $bindable(false) } = $props();

    /** @type {HTMLAudioElement | null} */
    let audioElement = $state(null);

    $effect(() => {
        if (audioElement && bgMusicUrl) {
            audioElement.src = bgMusicUrl;
        }
    });

    export function togglePlay() {
        if (!audioElement) return;
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
        } else {
            audioElement.play().then(() => {
                isPlaying = true;
            }).catch((err) => {
                console.warn('Autoplay prevented by browser:', err);
                isPlaying = false;
            });
        }
    }

    export function startPlaying() {
        if (!audioElement || !bgMusicUrl) return;
        audioElement.play().then(() => {
            isPlaying = true;
        }).catch((err) => {
            console.warn('Audio play failed:', err);
            isPlaying = false;
        });
    }

    onMount(() => {
        if (audioElement) {
            audioElement.loop = true;
        }
    });
</script>

<audio bind:this={audioElement} preload="auto" loop></audio>

{#if bgMusicUrl}
    <div class="fixed bottom-6 right-6 z-40">
        <button
            type="button"
            onclick={togglePlay}
            aria-label={isPlaying ? 'Hentikan Musik' : 'Putar Musik'}
            class="group relative flex items-center justify-center w-14 h-14 bg-white/80 backdrop-blur-md border-2 border-[#f4acb7] rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
            <!-- Spinning disk / music note -->
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f4acb7] to-[#e8d8c8] flex items-center justify-center text-[#4a3b32] {isPlaying ? 'animate-spin-slow' : 'animate-spin-paused'} shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-2v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-2" />
                </svg>
            </div>

            <!-- Pulse ring effect when playing -->
            {#if isPlaying}
                <span class="absolute -inset-1 rounded-full bg-[#f4acb7]/40 animate-ping pointer-events-none"></span>
            {/if}
        </button>
    </div>
{/if}
