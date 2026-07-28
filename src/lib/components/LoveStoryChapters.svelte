<script>
    import { viewport } from '$lib/actions/viewport.js';
    import { fade, fly } from 'svelte/transition';

    let { chapterItems = [] } = $props();

    let isVisible = $state(false);
    let activeChapter = $state(0);

    const defaultChapters = [
        {
            num: 'Bab I',
            title: 'Pertemuan Pertama',
            subtitle: 'Awal Dari Semua Cerita',
            icon: '🌱',
            story: 'Takdir memiliki caranya sendiri untuk mempertemukan dua manusia. Di sebuah senja yang biasa, tatap mata pertama menjadi awal dari perjalanan yang luar biasa ini.'
        },
        {
            num: 'Bab II',
            title: 'Tumbuhnya Cinta',
            subtitle: 'Hari-Hari Penuh Warna',
            icon: '🌸',
            story: 'Setiap percakapan pendek berubah menjadi cerita panjang. Tawa, perhatian kecil, dan rasa nyaman yang tumbuh membuat kami sadar bahwa kami saling melengkapi.'
        },
        {
            num: 'Bab III',
            title: 'Petualangan Bersama',
            subtitle: 'Melangkah Bergandengan Tangan',
            icon: '✈️',
            story: 'Melintasi berbagai tempat, melewati setiap musim kehidupan bersama. Baik saat suka maupun duka, tangan ini tetap saling menggenggam erat.'
        },
        {
            num: 'Bab IV',
            title: 'Menatap Masa Depan',
            subtitle: 'Janji Kebersamaan Abadi',
            icon: '💍',
            story: 'Kisah ini tidak berhenti di sini. Kami siap menuliskan bab-bab baru dalam buku kehidupan kami dengan penuh cinta, harapan, dan doa.'
        }
    ];

    let chapters = $derived(chapterItems.length > 0 ? chapterItems : defaultChapters);
</script>

<section 
    id="chapters"
    use:viewport={{ threshold: 0.15 }}
    onenterViewport={() => isVisible = true}
    class="py-20 px-4 max-w-5xl mx-auto text-center"
>
    <!-- Title -->
    <div class="space-y-3 mb-12">
        <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Bab Demi Bab</span>
        <h2 class="font-serif-title text-3xl md:text-5xl font-bold text-[#4a3b32] tracking-wide">
            Kisah Perjalanan Cinta
        </h2>
        <div class="w-16 h-0.5 bg-[#f4acb7] mx-auto rounded-full mt-2"></div>
    </div>

    {#if isVisible}
        <div in:fade={{ duration: 800 }} class="space-y-8">
            <!-- Chapter Selector Pills -->
            <div class="flex overflow-x-auto justify-center space-x-3 pb-2">
                {#each chapters as ch, idx}
                    <button
                        type="button"
                        onclick={() => activeChapter = idx}
                        class="px-5 py-2.5 rounded-full font-semibold text-xs transition-all duration-300 whitespace-nowrap {activeChapter === idx ? 'bg-[#f4acb7] text-white shadow-md scale-105' : 'bg-white text-[#4a3b32] hover:bg-[#fff0f3]'}"
                    >
                        {ch.num}: {ch.title}
                    </button>
                {/each}
            </div>

            <!-- Active Chapter Content Card -->
            {#key activeChapter}
                {#if chapters[activeChapter]}
                    <div 
                        in:fly={{ y: 20, duration: 600 }}
                        class="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-[#f4acb7]/40 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden space-y-6 text-center"
                    >
                        <div class="w-16 h-16 rounded-full bg-[#fff0f3] border border-[#f4acb7]/40 flex items-center justify-center text-3xl mx-auto">
                            {chapters[activeChapter].icon || '📖'}
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-bold uppercase tracking-widest text-[#f4acb7]">
                                {chapters[activeChapter].num} &sdot; {chapters[activeChapter].subtitle || ''}
                            </span>
                            <h3 class="font-serif-title text-2xl md:text-4xl font-bold text-[#4a3b32]">
                                {chapters[activeChapter].title}
                            </h3>
                        </div>

                        <p class="font-serif-title italic text-base md:text-lg text-[#4a3b32]/90 leading-relaxed px-4">
                            "{chapters[activeChapter].story}"
                        </p>
                    </div>
                {/if}
            {/key}
        </div>
    {/if}
</section>
