<script>
    import { scrollReveal } from '$lib/actions/scrollReveal.js';
    import { tilt3d } from '$lib/actions/tilt3d.js';

    let { 
        groomName = 'Bripda Rival', 
        groomPhotoUrl = '', 
        brideName = 'Siti', 
        bridePhotoUrl = '', 
        mainQuote = 'Setiap detik bersamamu adalah takdir terindah dalam hidupku.' 
    } = $props();
</script>

<section id="profile" class="py-20 px-4 max-w-5xl mx-auto text-center perspective-container">
    <div class="space-y-12">
        <!-- Header: Hidden initially, revealed on scroll -->
        <div use:scrollReveal={{ delay: 0, distance: 50 }} class="space-y-3">
            <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Kisah Dua Hati</span>
            <h2 class="font-serif-title text-3xl md:text-5xl font-bold text-[#4a3b32] tracking-wide">
                Dua Insan Bahagia
            </h2>
            <div class="w-16 h-0.5 bg-[#f4acb7] mx-auto rounded-full mt-2"></div>
        </div>

        <!-- Couple Cards: Hidden initially, revealed on scroll -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <!-- Groom Card -->
            <div 
                use:scrollReveal={{ delay: 180, distance: 65 }}
                use:tilt3d={{ maxTilt: 8, perspective: 1000 }}
                class="bg-white/70 backdrop-blur-sm border border-[#f4acb7]/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-4 card-3d-hover"
            >
                <div class="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg group">
                    <img 
                        src={groomPhotoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'} 
                        alt={groomName}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div class="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full"></div>
                </div>
                <div>
                    <h3 class="font-serif-title text-2xl md:text-3xl font-bold text-[#4a3b32]">
                        {groomName}
                    </h3>
                    <p class="text-xs uppercase tracking-widest text-[#f4acb7] font-semibold mt-1">The Gentleman</p>
                </div>
            </div>

            <!-- Bride Card -->
            <div 
                use:scrollReveal={{ delay: 320, distance: 65 }}
                use:tilt3d={{ maxTilt: 8, perspective: 1000 }}
                class="bg-white/70 backdrop-blur-sm border border-[#f4acb7]/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-4 card-3d-hover"
            >
                <div class="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg group">
                    <img 
                        src={bridePhotoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
                        alt={brideName}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div class="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full"></div>
                </div>
                <div>
                    <h3 class="font-serif-title text-2xl md:text-3xl font-bold text-[#4a3b32]">
                        {brideName}
                    </h3>
                    <p class="text-xs uppercase tracking-widest text-[#f4acb7] font-semibold mt-1">The Lady</p>
                </div>
            </div>
        </div>

        <!-- Main Quote Card: Hidden initially, revealed on scroll -->
        <div 
            use:scrollReveal={{ delay: 450, distance: 55 }}
            use:tilt3d={{ maxTilt: 5, perspective: 1000 }}
            class="max-w-2xl mx-auto bg-gradient-to-r from-[#fff0f3] to-[#fdf8f5] border border-[#f4acb7]/40 rounded-2xl p-8 shadow-inner relative mt-6 card-3d-hover"
        >
            <span class="absolute top-3 left-4 text-4xl text-[#f4acb7]/40 font-serif">“</span>
            <p class="font-serif-title italic text-lg md:text-xl text-[#4a3b32] leading-relaxed px-4">
                {mainQuote}
            </p>
            <span class="absolute bottom-1 right-4 text-4xl text-[#f4acb7]/40 font-serif">”</span>
        </div>
    </div>
</section>
