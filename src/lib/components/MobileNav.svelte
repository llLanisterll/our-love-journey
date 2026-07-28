<script>
    let activeSection = $state('hero-section');

    /**
     * @param {string} id
     */
    function scrollTo(id) {
        activeSection = id;
        const elem = document.getElementById(id);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>

<!-- Mobile Floating Glassmorphism Bottom Navigation Bar -->
<nav class="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm bg-white/75 backdrop-blur-lg border border-[#f4acb7]/40 rounded-full px-3 py-2 shadow-xl flex items-center justify-around transition-all duration-300">
    <button
        type="button"
        onclick={() => scrollTo('hero-section')}
        class="flex flex-col items-center justify-center p-2 rounded-full transition-colors {activeSection === 'hero-section' ? 'text-[#f4acb7] font-bold scale-110' : 'text-[#4a3b32]/70'}"
        aria-label="Beranda"
    >
        <span class="text-lg">🏠</span>
        <span class="text-[9px] font-semibold">Utama</span>
    </button>

    <button
        type="button"
        onclick={() => scrollTo('chapters')}
        class="flex flex-col items-center justify-center p-2 rounded-full transition-colors {activeSection === 'chapters' ? 'text-[#f4acb7] font-bold scale-110' : 'text-[#4a3b32]/70'}"
        aria-label="Bab Cerita"
    >
        <span class="text-lg">📖</span>
        <span class="text-[9px] font-semibold">Cerita</span>
    </button>

    <button
        type="button"
        onclick={() => scrollTo('profile')}
        class="flex flex-col items-center justify-center p-2 rounded-full transition-colors {activeSection === 'profile' ? 'text-[#f4acb7] font-bold scale-110' : 'text-[#4a3b32]/70'}"
        aria-label="Profil Pasangan"
    >
        <span class="text-lg">💑</span>
        <span class="text-[9px] font-semibold">Profil</span>
    </button>

    <button
        type="button"
        onclick={() => scrollTo('timeline')}
        class="flex flex-col items-center justify-center p-2 rounded-full transition-colors {activeSection === 'timeline' ? 'text-[#f4acb7] font-bold scale-110' : 'text-[#4a3b32]/70'}"
        aria-label="Garis Waktu"
    >
        <span class="text-lg">⏳</span>
        <span class="text-[9px] font-semibold">Waktu</span>
    </button>

    <button
        type="button"
        onclick={() => scrollTo('gallery')}
        class="flex flex-col items-center justify-center p-2 rounded-full transition-colors {activeSection === 'gallery' ? 'text-[#f4acb7] font-bold scale-110' : 'text-[#4a3b32]/70'}"
        aria-label="Galeri Foto"
    >
        <span class="text-lg">📸</span>
        <span class="text-[9px] font-semibold">Galeri</span>
    </button>
</nav>
