<script>
    import CoverOverlay from '$lib/components/CoverOverlay.svelte';
    import MusicPlayer from '$lib/components/MusicPlayer.svelte';
    import MobileNav from '$lib/components/MobileNav.svelte';
    import LoveCounter from '$lib/components/LoveCounter.svelte';
    import LoveStoryChapters from '$lib/components/LoveStoryChapters.svelte';
    import CoupleProfile from '$lib/components/CoupleProfile.svelte';
    import Timeline from '$lib/components/Timeline.svelte';
    import Gallery from '$lib/components/Gallery.svelte';
    import EventDetails from '$lib/components/EventDetails.svelte';
    import GiftRSVP from '$lib/components/GiftRSVP.svelte';

    let { data } = $props();

    /** @type {ReturnType<typeof MusicPlayer> | null} */
    let musicPlayerRef = $state(null);
    let isMusicPlaying = $state(false);

    function handleOpenMessage() {
        // Putar lagu background saat tombol "Buka Perjalanan Cinta" diklik
        if (musicPlayerRef) {
            musicPlayerRef.startPlaying();
        }

        // Smooth scroll ke section hero
        const profileElem = document.getElementById('hero-section');
        if (profileElem) {
            profileElem.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>

<svelte:head>
    <title>Our Love Journey - {data.config.groom_name} & {data.config.bride_name}</title>
    <meta name="description" content="Catatan Perjalanan Cinta dan Kenangan Kebersamaan {data.config.groom_name} & {data.config.bride_name}" />
</svelte:head>

<main class="relative min-h-screen bg-[#fdf8f5] text-[#3d2e28] overflow-x-hidden font-body selection:bg-[#f4acb7]/30 pb-20 md:pb-0">

    <!-- 1. Fullscreen Cover Overlay (Curtain Opening Animation) -->
    <CoverOverlay
        guestName={data.guestName}
        groomName={data.config.groom_name}
        brideName={data.config.bride_name}
        coverPhotoUrl={data.config.cover_photo_url}
        onOpen={handleOpenMessage}
    />

    <!-- 2. Floating Music Player & Mobile Navigation Bar -->
    <MusicPlayer
        bind:this={musicPlayerRef}
        bind:isPlaying={isMusicPlaying}
        bgMusicUrl={data.config.bg_music_url}
    />
    <MobileNav />

    <!-- 3. Hero Header Section -->
    <header id="hero-section" class="relative py-20 md:py-28 text-center px-4 bg-gradient-to-b from-[#fff0f3] via-[#fdf8f5] to-[#fdf8f5] border-b border-[#f4acb7]/20 overflow-hidden">
        <div class="max-w-3xl mx-auto space-y-4 md:space-y-6 relative z-10">
            <span class="font-script text-3xl sm:text-4xl md:text-5xl text-[#f4acb7] tracking-wider block">Our Love Story</span>
            
            <h1 class="font-serif-title text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#4a3b32] drop-shadow-xs leading-tight">
                {data.config.groom_name} <span class="text-[#f4acb7] font-script font-normal text-4xl sm:text-6xl md:text-8xl">&</span> {data.config.bride_name}
            </h1>
            
            <p class="text-[11px] sm:text-xs md:text-sm text-[#4a3b32]/70 italic tracking-widest uppercase font-semibold">
                Dua Hati &sdot; Satu Perjalanan &sdot; Cerita Abadi
            </p>
        </div>
    </header>

    <!-- 4. Love Counter Stats (Days Together - Dynamic from DB start_date) -->
    <LoveCounter startDate={data.config.start_date || '2021-02-14'} />

    <!-- 5. Interactive Love Story Chapters (Bab I - IV) -->
    <LoveStoryChapters />

    <!-- 6. Couple Profile & Quote Section -->
    <CoupleProfile
        groomName={data.config.groom_name}
        groomPhotoUrl={data.config.groom_photo_url}
        brideName={data.config.bride_name}
        bridePhotoUrl={data.config.bride_photo_url}
        mainQuote={data.config.main_quote}
    />

    <!-- 7. Vertical Timeline Section -->
    <Timeline timelineItems={data.timeline} />

    <!-- 8. Special Places & Dates -->
    <EventDetails />

    <!-- 9. Gallery Memories Masonry Section -->
    <Gallery galleryItems={data.gallery} />

    <!-- 10. Tanda Kasih / Love Wishes -->
    <GiftRSVP />

    <!-- Romantic Footer -->
    <footer class="py-12 md:py-16 px-4 text-center bg-gradient-to-t from-[#fff0f3] to-[#fdf8f5] border-t border-[#f4acb7]/30 space-y-3">
        <p class="font-script text-3xl md:text-4xl text-[#f4acb7]">Cinta Yang Tumbuh Setiap Hari</p>
        <p class="font-serif-title text-xl md:text-2xl font-bold text-[#4a3b32]">
            {data.config.groom_name} & {data.config.bride_name}
        </p>
        <p class="text-[11px] md:text-xs text-[#4a3b32]/60">
            Our Love Journey &sdot; Digital Memory Book
        </p>
    </footer>

</main>
