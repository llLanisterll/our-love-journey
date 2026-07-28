<script>
    import { viewport } from '$lib/actions/viewport.js';
    import { fade, fly } from 'svelte/transition';

    let isVisible = $state(false);
</script>

<section 
    id="events"
    use:viewport={{ threshold: 0.15 }}
    onenterViewport={() => isVisible = true}
    class="py-20 px-4 max-w-5xl mx-auto text-center"
>
    <!-- Section Title -->
    <div class="space-y-3 mb-16">
        <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Momen Spesial</span>
        <h2 class="font-serif-title text-3xl md:text-5xl font-bold text-[#4a3b32] tracking-wide">
            Tempat Kenangan Indah
        </h2>
        <div class="w-16 h-0.5 bg-[#f4acb7] mx-auto rounded-full mt-2"></div>
    </div>

    {#if isVisible}
        <div in:fade={{ duration: 800 }} class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- First Date / Meeting Spot Card -->
            <div 
                in:fly={{ y: 30, duration: 800, delay: 150 }}
                class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between"
            >
                <div class="space-y-4">
                    <div class="w-14 h-14 rounded-full bg-[#fff0f3] border border-[#f4acb7]/40 flex items-center justify-center text-2xl mx-auto text-[#f4acb7]">
                        ☕
                    </div>
                    <h3 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Tempat Kencan Pertama</h3>
                    <div class="w-10 h-0.5 bg-[#f4acb7]/50 mx-auto rounded-full"></div>
                    
                    <p class="text-sm font-semibold text-[#f4acb7] uppercase tracking-wider">Awal Dari Cerita Kami</p>
                    <p class="text-sm text-[#4a3b32] font-medium leading-relaxed">
                        Kedai Kopi Kenangan Indah<br/>
                        Jl. Romantic No. 123, Kota Bandung
                    </p>
                    <p class="text-xs text-[#4a3b32]/70 italic">
                        Di mana kecanggungan berubah menjadi tawa dan perbincangan hangat hingga larut malam.
                    </p>
                </div>

                <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="w-full py-3 bg-[#fff0f3] hover:bg-[#ffe5ec] text-[#4a3b32] font-bold text-xs rounded-xl border border-[#f4acb7]/40 transition-colors flex items-center justify-center space-x-2"
                >
                    <span>📍 Petunjuk Lokasi Maps</span>
                </a>
            </div>

            <!-- Anniversary Spot Card -->
            <div 
                in:fly={{ y: 30, duration: 800, delay: 300 }}
                class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between"
            >
                <div class="space-y-4">
                    <div class="w-14 h-14 rounded-full bg-[#fff0f3] border border-[#f4acb7]/40 flex items-center justify-center text-2xl mx-auto text-[#f4acb7]">
                        ✨
                    </div>
                    <h3 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Lokasi Perayaan Spesial</h3>
                    <div class="w-10 h-0.5 bg-[#f4acb7]/50 mx-auto rounded-full"></div>
                    
                    <p class="text-sm font-semibold text-[#f4acb7] uppercase tracking-wider">Momen Kebersamaan</p>
                    <p class="text-sm text-[#4a3b32] font-medium leading-relaxed">
                        Taman Bunga & Resto Senja<br/>
                        Jl. Panoramic No. 45, Kota Bandung
                    </p>
                    <p class="text-xs text-[#4a3b32]/70 italic">
                        Tempat impian tempat kami merayakan momen indah dan saling menatap masa depan.
                    </p>
                </div>

                <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="w-full py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
                >
                    <span>📍 Petunjuk Lokasi Maps</span>
                </a>
            </div>
        </div>
    {/if}
</section>
