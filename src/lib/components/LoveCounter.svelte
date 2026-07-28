<script>
    import { viewport } from '$lib/actions/viewport.js';
    import { fade, scale } from 'svelte/transition';

    let { startDate = '2021-02-14' } = $props();

    let daysTogether = $state(0);
    let monthsTogether = $state(0);
    let isVisible = $state(false);

    $effect(() => {
        const start = new Date(startDate).getTime();
        const now = new Date().getTime();
        if (isNaN(start)) {
            daysTogether = 0;
            monthsTogether = 0;
            return;
        }
        const diffTime = Math.max(0, now - start);
        daysTogether = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        monthsTogether = Math.floor(daysTogether / 30.4375);
    });
</script>

<section 
    use:viewport={{ threshold: 0.15 }}
    onenterViewport={() => isVisible = true}
    class="py-16 px-4 max-w-4xl mx-auto text-center"
>
    {#if isVisible}
        <div in:fade={{ duration: 800 }} class="space-y-6">
            <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Perjalanan Waktu</span>
            <h2 class="font-serif-title text-3xl md:text-4xl font-bold text-[#4a3b32]">
                Hari Kebersamaan Kami
            </h2>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
                <div 
                    in:scale={{ duration: 600, delay: 100 }}
                    class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <span class="font-serif-title text-4xl md:text-5xl font-bold text-[#f4acb7] block">{daysTogether}</span>
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#4a3b32]/70">Hari Bersama</span>
                </div>

                <div 
                    in:scale={{ duration: 600, delay: 200 }}
                    class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <span class="font-serif-title text-4xl md:text-5xl font-bold text-[#4a3b32] block">{monthsTogether}</span>
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#4a3b32]/70">Bulan Kasih Sayang</span>
                </div>

                <div 
                    in:scale={{ duration: 600, delay: 300 }}
                    class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <span class="font-serif-title text-4xl md:text-5xl font-bold text-[#f4acb7] block">∞</span>
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#4a3b32]/70">Tawa & Senyuman</span>
                </div>

                <div 
                    in:scale={{ duration: 600, delay: 400 }}
                    class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <span class="font-serif-title text-4xl md:text-5xl font-bold text-[#4a3b32] block">1</span>
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#4a3b32]/70">Cinta Sejati</span>
                </div>
            </div>
        </div>
    {/if}
</section>
