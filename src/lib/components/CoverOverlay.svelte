<script>
    import { fade, fly, scale } from 'svelte/transition';

    /**
     * Props
     */
    let { 
        guestName = 'Tamu Undangan', 
        groomName = 'Bripda Rival', 
        brideName = 'Siti', 
        coverPhotoUrl = '', 
        onOpen = () => {} 
    } = $props();

    let isOpened = $state(false);
    let isOpening = $state(false);

    function handleOpen() {
        isOpening = true;
        onOpen();
        setTimeout(() => {
            isOpened = true;
        }, 900);
    }
</script>

{#if !isOpened}
    <div 
        class="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-cover bg-center text-white text-center overflow-hidden transition-all duration-1000 {isOpening ? 'curtain-exit' : ''}"
        style="background-image: linear-gradient(to bottom, rgba(42, 30, 26, 0.70), rgba(74, 59, 50, 0.88)), url('{coverPhotoUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'}');"
    >
        <!-- Top Floral Ornaments Accent -->
        <div class="absolute top-0 left-0 right-0 flex justify-between pointer-events-none p-4 opacity-70">
            <svg class="w-20 h-20 text-[#f4acb7]/40 transform -rotate-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <svg class="w-20 h-20 text-[#f4acb7]/40 transform rotate-12 scale-x-[-1]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
        </div>

        <!-- Header Titles -->
        <div class="mt-12 space-y-2 animate-float">
            <p class="font-script text-3xl md:text-5xl text-[#f4acb7] tracking-widest drop-shadow-sm">The Wedding Invitation</p>
            <h1 class="font-serif-title text-4xl md:text-6xl font-bold tracking-tight text-[#fff0f3] drop-shadow-md">
                {groomName} <span class="text-[#f4acb7] font-script font-normal text-4xl md:text-6xl">&</span> {brideName}
            </h1>
        </div>

        <!-- Central Envelope & Greeting Card -->
        <div 
            in:scale={{ duration: 900, start: 0.9 }}
            class="w-full max-w-sm my-auto bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden group"
        >
            <!-- Decorative Ribbon / Stamp Seal -->
            <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f4acb7] to-[#e8d8c8] mx-auto flex items-center justify-center text-[#4a3b32] font-bold shadow-lg border-2 border-white/40">
                💌
            </div>

            <div class="space-y-1">
                <p class="text-xs text-gray-200 font-light tracking-wider uppercase">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
                <h2 class="font-serif-title text-2xl md:text-3xl font-bold text-[#fdf8f5] capitalize">
                    {guestName}
                </h2>
            </div>

            <p class="text-xs text-gray-200 italic leading-relaxed">
                Tanpa mengurangi rasa hormat, kami mengundang Anda untuk berbagi kebahagiaan di hari istimewa kami.
            </p>

            <button
                type="button"
                onclick={handleOpen}
                disabled={isOpening}
                class="w-full py-4 px-6 bg-gradient-to-r from-[#f4acb7] via-[#e8d8c8] to-[#f4acb7] hover:brightness-110 text-[#3d2e28] font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center space-x-2 text-sm tracking-wide animate-pulse-glow"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-89a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{isOpening ? 'Membuka Undangan...' : 'Buka Undangan'}</span>
            </button>
        </div>

        <!-- Footer Hint -->
        <div class="mb-4 text-xs text-gray-300/80 font-light">
            <p>*Klik tombol untuk membuka undangan & memutar musik</p>
        </div>
    </div>
{/if}
