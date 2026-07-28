<script>
    import { fade, fly } from 'svelte/transition';

    /**
     * Props
     */
    let { 
        guestName = 'Tamu Undangan', 
        groomName = 'Romeo', 
        brideName = 'Juliet', 
        coverPhotoUrl = '', 
        onOpen = () => {} 
    } = $props();

    let isOpened = $state(false);

    function handleOpen() {
        isOpened = true;
        onOpen();
    }
</script>

{#if !isOpened}
    <div 
        transition:fade={{ duration: 700 }}
        class="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-cover bg-center text-white text-center overflow-hidden"
        style="background-image: linear-gradient(to bottom, rgba(42, 30, 26, 0.65), rgba(74, 59, 50, 0.85)), url('{coverPhotoUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'}');"
    >
        <!-- Header Decor -->
        <div class="mt-8 animate-fade-in">
            <p class="font-script text-3xl md:text-4xl text-[#f4acb7] tracking-wider mb-2">The Wedding Journey</p>
            <h1 class="font-serif-title text-4xl md:text-6xl font-bold tracking-tight text-[#fff0f3] drop-shadow-md">
                {groomName} & {brideName}
            </h1>
        </div>

        <!-- Guest Greeting Card -->
        <div 
            in:fly={{ y: 20, duration: 800, delay: 200 }}
            class="w-full max-w-sm my-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl space-y-4"
        >
            <div class="inline-block px-3 py-1 bg-[#f4acb7]/30 border border-[#f4acb7]/40 rounded-full text-xs tracking-widest uppercase font-medium text-[#fff0f3]">
                Undangan Spesial
            </div>
            
            <p class="text-sm text-gray-200 font-light">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
            
            <h2 class="font-serif-title text-2xl md:text-3xl font-bold text-[#fdf8f5] capitalize">
                Halo, {guestName}!
            </h2>

            <p class="text-xs text-gray-300 italic">
                Tanpa mengurangi rasa hormat, kami mengundang Anda untuk menyertai perjalanan kisah cinta kami.
            </p>

            <button
                type="button"
                onclick={handleOpen}
                class="w-full py-3.5 px-6 bg-gradient-to-r from-[#f4acb7] to-[#d8e2dc] hover:from-[#e89aa7] hover:to-[#c6d4cc] text-[#3d2e28] font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center space-x-2 text-sm tracking-wide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-89a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Buka Pesan & Cerita</span>
            </button>
        </div>

        <!-- Footer Notice -->
        <div class="mb-4 text-xs text-gray-300/80 font-light">
            <p>*Klik tombol di atas untuk membuka pesan & memutar musik background</p>
        </div>
    </div>
{/if}
