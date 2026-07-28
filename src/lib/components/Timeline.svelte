<script>
    import { viewport } from '$lib/actions/viewport.js';
    import { fly } from 'svelte/transition';

    let { timelineItems = [] } = $props();

    // Default sample timeline if empty
    const defaultTimeline = [
        {
            id: '1',
            date_label: '12 Oktober 2020',
            title: 'Awal Pertemuan',
            description: 'Takdir mempertemukan kami pertama kali di sebuah acara keluarga. Sebuah senyuman sederhana yang membuka halaman pertama cerita kami.'
        },
        {
            id: '2',
            date_label: '14 Februari 2021',
            title: 'Mengikat Janji Kebersamaan',
            description: 'Kami memutuskan untuk saling mendampingi dan melangkah bersama melalui setiap suka dan duka kehidupan.'
        },
        {
            id: '3',
            date_label: '20 Mei 2023',
            title: 'Lamaran Romantis',
            description: 'Di hadapan kedua keluarga besar, niat suci diucapkan untuk melangkah ke jenjang ikatan suci pernikahan.'
        }
    ];

    let items = $derived(timelineItems.length > 0 ? timelineItems : defaultTimeline);

    // Track visible items index for staggered animations
    /** @type {Set<number>} */
    let visibleItems = $state(new Set());

    /**
     * @param {number} index
     */
    function markVisible(index) {
        visibleItems.add(index);
    }
</script>

<section id="timeline" class="py-20 px-4 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="text-center space-y-3 mb-16">
        <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Momen Berharga</span>
        <h2 class="font-serif-title text-3xl md:text-5xl font-bold text-[#4a3b32] tracking-wide">
            Garis Waktu Cinta Kami
        </h2>
        <div class="w-16 h-0.5 bg-[#f4acb7] mx-auto rounded-full mt-2"></div>
    </div>

    <!-- Vertical Timeline Container -->
    <div class="relative border-l-2 border-[#f4acb7]/50 ml-4 md:ml-1/2 space-y-12 pb-6">
        {#each items as item, index (item.id || index)}
            <div 
                use:viewport={{ threshold: 0.2 }}
                onenterViewport={() => markVisible(index)}
                class="relative pl-8 md:pl-0"
            >
                <!-- Timeline Dot Indicator -->
                <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#f4acb7] border-4 border-white shadow-md z-10 md:left-1/2 md:-translate-x-1/2"></div>

                {#if visibleItems.has(index)}
                    <!-- Animated Timeline Card -->
                    <div 
                        in:fly={{ y: 30, duration: 700, delay: 100 }}
                        class="md:w-5/12 {index % 2 === 0 ? 'md:mr-auto md:text-right md:pr-12' : 'md:ml-auto md:text-left md:pl-12'}"
                    >
                        <div class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-3">
                            <span class="inline-block px-3 py-1 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-full text-xs font-semibold text-[#f4acb7] uppercase tracking-wider">
                                {item.date_label}
                            </span>
                            
                            <h3 class="font-serif-title text-xl md:text-2xl font-bold text-[#4a3b32]">
                                {item.title}
                            </h3>

                            <p class="text-sm text-[#4a3b32]/80 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</section>
