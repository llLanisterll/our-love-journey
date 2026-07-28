<script>
    import CoverOverlay from '$lib/components/CoverOverlay.svelte';
    import MusicPlayer from '$lib/components/MusicPlayer.svelte';
    import CoupleProfile from '$lib/components/CoupleProfile.svelte';
    import Timeline from '$lib/components/Timeline.svelte';
    import Gallery from '$lib/components/Gallery.svelte';

    let { data } = $props();

    /** @type {ReturnType<typeof MusicPlayer> | null} */
    let musicPlayerRef = $state(null);
    let isMusicPlaying = $state(false);

    function handleOpenMessage() {
        // Putar lagu background saat tombol "Buka Pesan" diklik
        if (musicPlayerRef) {
            musicPlayerRef.startPlaying();
        }

        // Smooth scroll ke section profil
        const profileElem = document.getElementById('profile');
        if (profileElem) {
            profileElem.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>

<svelte:head>
    <title>Perjalanan Cinta {data.config.groom_name} & {data.config.bride_name}</title>
    <meta name="description" content="Kisah perjalanan cinta dan kenangan bahagia {data.config.groom_name} & {data.config.bride_name}" />
</svelte:head>

<main class="relative min-h-screen bg-[#fdf8f5] text-[#3d2e28] overflow-x-hidden font-body selection:bg-[#f4acb7]/30">

    <!-- 1. Fullscreen Cover & URL Parameter Greeting ?to= -->
    <CoverOverlay
        guestName={data.guestName}
        groomName={data.config.groom_name}
        brideName={data.config.bride_name}
        coverPhotoUrl={data.config.cover_photo_url}
        onOpen={handleOpenMessage}
    />

    <!-- 2. Floating Music Player -->
    <MusicPlayer
        bind:this={musicPlayerRef}
        bind:isPlaying={isMusicPlaying}
        bgMusicUrl={data.config.bg_music_url}
    />

    <!-- Hero / Top Banner -->
    <header class="relative py-24 text-center px-4 bg-gradient-to-b from-[#fff0f3] to-[#fdf8f5] border-b border-[#f4acb7]/20">
        <div class="max-w-3xl mx-auto space-y-4">
            <span class="font-script text-4xl md:text-5xl text-[#f4acb7]">The Love Story of</span>
            <h1 class="font-serif-title text-4xl md:text-6xl font-bold tracking-tight text-[#4a3b32]">
                {data.config.groom_name} <span class="text-[#f4acb7] font-script font-normal text-5xl md:text-7xl">&</span> {data.config.bride_name}
            </h1>
            <p class="text-sm md:text-base text-[#4a3b32]/70 italic tracking-widest uppercase">
                Selamat Datang Di Perjalanan Cinta Kami
            </p>
        </div>
    </header>

    <!-- 3. Couple Profile & Quote Section -->
    <CoupleProfile
        groomName={data.config.groom_name}
        groomPhotoUrl={data.config.groom_photo_url}
        brideName={data.config.bride_name}
        bridePhotoUrl={data.config.bride_photo_url}
        mainQuote={data.config.main_quote}
    />

    <!-- 4. Vertical Timeline Section -->
    <Timeline timelineItems={data.timeline} />

    <!-- 5. Gallery Memories Masonry Section -->
    <Gallery galleryItems={data.gallery} />

    <!-- Footer -->
    <footer class="py-16 px-4 text-center bg-gradient-to-t from-[#fff0f3] to-[#fdf8f5] border-t border-[#f4acb7]/30 space-y-4">
        <p class="font-script text-3xl text-[#f4acb7]">Terima Kasih</p>
        <p class="font-serif-title text-2xl font-bold text-[#4a3b32]">
            {data.config.groom_name} & {data.config.bride_name}
        </p>
        <p class="text-xs text-[#4a3b32]/60">
            Dibuat dengan penuh cinta &sdot; Undangan Digital Romantis
        </p>
    </footer>

</main>
