<script>
    import { viewport } from '$lib/actions/viewport.js';
    import { fade, fly } from 'svelte/transition';

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

    let items = $derived(timelineItems && timelineItems.length > 0 ? timelineItems : defaultTimeline);

    let isVisible = $state(false);
</script>

<section 
    id="timeline" 
    use:viewport={{ threshold: 0.15 }}
    onenterViewport={() => isVisible = true}
    class="py-20 px-4 max-w-4xl mx-auto overflow-hidden"
>
    <!-- Header -->
    <div class="text-center space-y-3 mb-16">
        <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Momen Berharga</span>
        <h2 class="font-serif-title text-3xl md:text-5xl font-bold text-[#4a3b32] tracking-wide">
            Garis Waktu Cinta Kami
        </h2>
        <div class="w-16 h-0.5 bg-[#f4acb7] mx-auto rounded-full mt-2"></div>
    </div>

    {#if isVisible}
        <div in:fade={{ duration: 600 }} class="relative">
            <!-- Vertical Line: Left on mobile (20px), Center on desktop (50%) -->
            <div class="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#f4acb7] via-[#f4acb7]/60 to-transparent -translate-x-1/2"></div>

            <!-- Timeline Items -->
            <div class="space-y-8 md:space-y-12 relative">
                {#each items as item, index (item.id || index)}
                    <div 
                        in:fly={{ y: 30, duration: 600, delay: index * 150 }}
                        class="relative flex flex-col md:flex-row items-start md:items-center"
                    >
                        <!-- Timeline Dot Indicator -->
                        <div class="absolute left-5 md:left-1/2 top-6 w-4 h-4 rounded-full bg-[#f4acb7] border-4 border-white shadow-md z-10 -translate-x-1/2"></div>

                        <!-- Card Wrapper -->
                        <div class="w-full pl-12 md:pl-0 {index % 2 === 0 ? 'md:w-1/2 md:pr-10 md:text-right md:ml-0' : 'md:w-1/2 md:pl-10 md:text-left md:ml-auto'}">
                            <div class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-3 relative">
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
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</section>

