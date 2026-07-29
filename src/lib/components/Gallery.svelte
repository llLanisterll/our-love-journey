<script>
    import { scrollReveal } from '$lib/actions/scrollReveal.js';
    import { tilt3d } from '$lib/actions/tilt3d.js';
    import { fade, fly, scale } from 'svelte/transition';

    let { galleryItems = [] } = $props();



    const defaultGallery = [
        { 
            id: '1', 
            image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
            image_urls: [
                'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
            ],
            caption: 'Kencan Pertama di Kedai Kopi', 
            story: 'Hari di mana perbincangan canggung kita berubah menjadi tawa hangat yang tak terlupakan.' 
        },
        { 
            id: '2', 
            image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
            image_urls: [
                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80'
            ],
            caption: 'Menikmati Senja Bersama', 
            story: 'Duduk berdua menyaksikan warna langit berganti, merasa bersyukur atas kehadiran satu sama lain.' 
        },
        { 
            id: '3', 
            image_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
            image_urls: [
                'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80'
            ],
            caption: 'Senyuman & Tawa Bahagia', 
            story: 'Setiap detik bersamamu selalu dipenuhi kehangatan dan senyuman yang tulus.' 
        }
    ];

    let items = $derived(galleryItems.length > 0 ? galleryItems : defaultGallery);
    let isVisible = $state(false);

    /** @type {Record<string | number, number>} */
    let activeCardSlideIndices = $state({});

    /** Real-time interactive finger tracking state */
    let activeDragCardId = $state(/** @type {string | number | null} */ (null));
    let isDragging = $state(false);
    let touchStartX = $state(0);
    let touchStartY = $state(0);
    let dragOffset = $state(0);

    /**
     * @param {TouchEvent | MouseEvent} e
     * @param {string | number} cardId
     */
    function handleDragStart(e, cardId) {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        activeDragCardId = cardId;
        isDragging = true;
        touchStartX = clientX;
        touchStartY = clientY;
        dragOffset = 0;
    }

    /**
     * @param {TouchEvent | MouseEvent} e
     */
    function handleDragMove(e) {
        if (!isDragging || activeDragCardId === null) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const deltaX = clientX - touchStartX;
        const deltaY = clientY - touchStartY;

        // Track drag if horizontal movement is greater than vertical scroll
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            dragOffset = deltaX;
        }
    }

    /**
     * @param {string | number} cardId
     * @param {number} totalSlides
     */
    function handleDragEnd(cardId, totalSlides) {
        if (!isDragging || activeDragCardId !== cardId) return;

        if (dragOffset < -50) {
            // Dragged left -> Next slide
            slideCard(cardId, totalSlides, 1);
        } else if (dragOffset > 50) {
            // Dragged right -> Previous slide
            slideCard(cardId, totalSlides, -1);
        }

        // Reset drag state
        isDragging = false;
        dragOffset = 0;
        activeDragCardId = null;
    }

    /**
     * @param {string|number} cardId
     * @param {number} totalSlides
     * @param {number} direction
     */
    function slideCard(cardId, totalSlides, direction) {
        const current = activeCardSlideIndices[cardId] || 0;
        let next = current + direction;
        if (next < 0) next = totalSlides - 1;
        if (next >= totalSlides) next = 0;
        activeCardSlideIndices[cardId] = next;
    }

    /**
     * @param {string|number} cardId
     * @param {number} slideIdx
     */
    function setCardSlide(cardId, slideIdx) {
        activeCardSlideIndices[cardId] = slideIdx;
    }

    /** @type {{ image_url?: string, image_urls?: string[], caption?: string, story?: string } | null} */
    let selectedCard = $state(null);
    let selectedImageIndex = $state(0);

    /**
     * @param {{ image_url?: string, image_urls?: string[], caption?: string, story?: string }} card
     * @param {number} [photoIdx]
     */
    function openLightbox(card, photoIdx = 0) {
        // Open lightbox only if not performing a drag swipe
        if (Math.abs(dragOffset) < 10) {
            selectedCard = card;
            selectedImageIndex = photoIdx;
        }
    }

    function closeLightbox() {
        selectedCard = null;
        selectedImageIndex = 0;
    }

    /**
     * @param {KeyboardEvent} e
     */
    function handleKeyDown(e) {
        if (e.key === 'Escape' && selectedCard) {
            closeLightbox();
        }
    }
</script>

<svelte:window onkeydown={handleKeyDown} onmousemove={handleDragMove} onmouseup={() => isDragging && activeDragCardId && handleDragEnd(activeDragCardId, 99)} />

<section 
    id="gallery" 
    class="py-6 sm:py-16 px-0 sm:px-4 max-w-5xl mx-auto perspective-container"
>
    <!-- Header with Scroll Surprise Animation: Hidden initially -->
    <div use:scrollReveal={{ delay: 0, distance: 55 }} class="text-center space-y-3 mb-8 sm:mb-12 px-4">
        <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Album Kenangan</span>
        <h2 class="font-serif-title text-3xl md:text-5xl font-bold text-[#4a3b32] tracking-wide">
            Kartu Cerita Foto & Kenangan
        </h2>
        <p class="text-xs md:text-sm text-[#4a3b32]/70 italic font-medium max-w-md mx-auto">
            Geser (swipe) slide untuk melihat catatan cerita & foto kenangan full screen.
        </p>
        <div class="w-16 h-0.5 bg-[#f4acb7] mx-auto rounded-full mt-2"></div>
    </div>

    <!-- Cards List - Frameless full-bleed 100% full screen cards (h-screen / 100vh) -->
    <div class="space-y-8 sm:space-y-16">
        {#each items as item, idx (item.id || item.image_url || idx)}
            {@const cardId = item.id || idx}
            {@const photos = item.image_urls && item.image_urls.length > 0 ? item.image_urls : [item.image_url]}
            {@const totalSlides = 1 + photos.length}
            {@const currentSlide = activeCardSlideIndices[cardId] || 0}
            {@const isThisCardDragging = activeDragCardId === cardId && isDragging}
            {@const currentOffset = isThisCardDragging ? dragOffset : 0}
            
            <div 
                use:scrollReveal={{ delay: 120, distance: 75 }}
                use:tilt3d={{ maxTilt: 5, perspective: 1000 }}
                class="relative w-full max-w-full sm:max-w-md md:max-w-xl mx-auto h-[100vh] sm:h-[90vh] md:h-[720px] bg-black rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between group card-3d-hover border-0"
            >
                    <!-- Top Status Badge -->
                    <div class="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
                        <div class="px-3.5 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-[11px] font-bold text-white shadow-md flex items-center space-x-1.5 border border-white/10">
                            {#if currentSlide === 0}
                                <span>📝 Slide 1: Catatan Cerita</span>
                            {:else}
                                <span>📸 Foto {currentSlide} dari {photos.length}</span>
                            {/if}
                        </div>

                        {#if photos.length > 0}
                            <span class="px-3 py-1.5 bg-[#f4acb7] backdrop-blur-md text-white rounded-full text-[10px] font-bold shadow-md">
                                👈 Geser foto 👉
                            </span>
                        {/if}
                    </div>

                    <!-- Slide Content Track (Real-time 60FPS Finger Drag Tracking) -->
                    <div 
                        class="relative w-full h-full overflow-hidden bg-black touch-pan-y cursor-grab active:cursor-grabbing select-none"
                        ontouchstart={(e) => handleDragStart(e, cardId)}
                        ontouchmove={handleDragMove}
                        ontouchend={() => handleDragEnd(cardId, totalSlides)}
                        onmousedown={(e) => handleDragStart(e, cardId)}
                        role="region"
                        aria-label="Area slide foto kenangan"
                    >
                        <div 
                            class="w-full h-full flex flex-nowrap"
                            style="
                                transform: translateX(calc(-{currentSlide * 100}% + {currentOffset}px));
                                transition: {isThisCardDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)'};
                            "
                        >
                            <!-- SLIDE 0: KATA-KATA CERITA -->
                            <div class="w-full h-full shrink-0 flex-none p-6 sm:p-10 flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#fff0f3] via-[#fdf8f5] to-[#fff0f3] overflow-y-auto">
                                <div class="my-auto space-y-6 max-w-md">
                                    <!-- Romantic Icon -->
                                    <div class="w-16 h-16 rounded-full bg-[#fff0f3] border-2 border-[#f4acb7]/40 flex items-center justify-center text-3xl mx-auto shadow-sm">
                                        💌
                                    </div>

                                    <!-- Caption Title -->
                                    <div class="space-y-2">
                                        <span class="text-xs font-bold uppercase tracking-widest text-[#f4acb7]">Catatan Kenangan</span>
                                        <h3 class="font-serif-title text-2xl sm:text-3xl font-bold text-[#4a3b32] leading-tight">
                                            {item.caption || 'Momen Spesial'}
                                        </h3>
                                    </div>

                                    <div class="w-12 h-0.5 bg-[#f4acb7]/50 mx-auto rounded-full"></div>

                                    <!-- Main Story Text -->
                                    <p class="font-serif-title italic text-sm sm:text-base md:text-lg text-[#4a3b32]/90 leading-relaxed px-2">
                                        "{item.story || 'Catatan indah kebersamaan dan kenangan manis yang tersimpan di dalam hati.'}"
                                    </p>
                                </div>

                                <!-- Next Slide Hint Text -->
                                <div class="mb-10 sm:mb-4 px-5 py-2 bg-[#f4acb7]/20 border border-[#f4acb7]/40 text-[#4a3b32] text-xs font-bold rounded-full shadow-xs flex items-center space-x-2 animate-pulse">
                                    <span>👈 Geser Layar Untuk Lihat Foto ({photos.length}) 👉</span>
                                </div>
                            </div>

                            <!-- SLIDE 1..N: FULLSCREEN AMBIENT PHOTOS (Zero over-zoom, 100% full photo visible) -->
                            {#each photos as photoUrl, pIdx}
                                <div class="w-full h-full shrink-0 flex-none relative bg-black/90 flex items-center justify-center group/img overflow-hidden">
                                    <!-- Soft Ambient Blurred Background of the Photo -->
                                    <div 
                                        class="absolute inset-0 bg-cover bg-center blur-2xl opacity-45 scale-110 pointer-events-none transition-all duration-700"
                                        style="background-image: url('{photoUrl}');"
                                    ></div>

                                    <!-- Main Photo: Natural 100% framing without aggressive cropping or over-zooming -->
                                    <button
                                        type="button"
                                        onclick={() => openLightbox(item, pIdx)}
                                        class="relative z-10 w-full h-full text-left focus:outline-none cursor-pointer flex items-center justify-center p-2 sm:p-4"
                                        aria-label="Buka foto full screen"
                                    >
                                        <img 
                                            src={photoUrl} 
                                            alt={item.caption || 'Foto Kenangan Cinta'}
                                            class="max-w-full max-h-full object-contain rounded-xl drop-shadow-2xl transition-transform duration-500 group-hover/img:scale-[1.03] pointer-events-none"
                                            style="image-rendering: -webkit-optimize-contrast;"
                                        />
                                    </button>

                                    <!-- Tap hint overlay -->
                                    <button 
                                        type="button"
                                        onclick={() => openLightbox(item, pIdx)}
                                        class="absolute bottom-16 right-4 px-3.5 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-white text-[10px] font-semibold opacity-80 hover:opacity-100 transition-opacity z-10 border border-white/10"
                                    >
                                        🔍 Ketuk Foto Untuk Perbesar
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Slide Bottom Indicator Dots (Floating Transparent Overlay) -->
                    <div class="absolute bottom-4 left-0 right-0 p-2 bg-transparent flex items-center justify-center space-x-2 z-20 pointer-events-auto">
                        {#each Array(totalSlides) as _, sIdx}
                            <button
                                type="button"
                                onclick={() => setCardSlide(cardId, sIdx)}
                                class="h-2 rounded-full transition-all duration-300 {currentSlide === sIdx ? 'w-6 bg-[#f4acb7] shadow-md' : 'w-2 bg-white/50 hover:bg-white/90'}"
                                aria-label={`Ke slide ${sIdx + 1}`}
                            ></button>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>

    <!-- Lightbox Modal for Full Resolution Photo Viewing -->
    {#if selectedCard}
        {@const cardObj = selectedCard}
        {@const modalPhotos = cardObj.image_urls && cardObj.image_urls.length > 0 ? cardObj.image_urls : [cardObj.image_url]}
        
        <div 
            transition:fade={{ duration: 300 }}
            onclick={closeLightbox}
            role="presentation"
            class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
        >
            <div 
                transition:scale={{ duration: 300 }}
                onclick={(e) => e.stopPropagation()}
                role="presentation"
                class="relative w-full max-w-4xl max-h-[92vh] bg-black/95 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center justify-between border border-white/10"
            >
                <button 
                    type="button"
                    onclick={closeLightbox}
                    class="absolute top-4 right-4 z-30 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors text-sm font-bold shadow-md"
                    aria-label="Tutup foto"
                >
                    ✕
                </button>
                
                <!-- Main Lightbox Photo -->
                <div class="relative w-full h-[65vh] sm:h-[72vh] flex items-center justify-center my-auto">
                    <img 
                        src={modalPhotos[selectedImageIndex]} 
                        alt={cardObj.caption || 'Foto Galeri'} 
                        class="max-w-full max-h-full object-contain rounded-2xl shadow-2xl pointer-events-none"
                    />

                    {#if modalPhotos.length > 1}
                        <button
                            type="button"
                            onclick={() => selectedImageIndex = (selectedImageIndex - 1 + modalPhotos.length) % modalPhotos.length}
                            class="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center text-lg shadow-md transition-colors z-20"
                        >
                            ❮
                        </button>
                        <button
                            type="button"
                            onclick={() => selectedImageIndex = (selectedImageIndex + 1) % modalPhotos.length}
                            class="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center text-lg shadow-md transition-colors z-20"
                        >
                            ❯
                        </button>
                    {/if}
                </div>

                <!-- Caption Footer -->
                <div class="text-center space-y-1 max-w-2xl px-4 pt-2 text-white">
                    <h3 class="font-serif-title text-lg sm:text-xl font-bold text-[#f4acb7]">
                        {cardObj.caption || 'Momen Spesial'}
                    </h3>
                    <p class="text-xs text-white/80 italic line-clamp-2">
                        "{cardObj.story || 'Kenangan manis yang tersimpan di hati.'}"
                    </p>
                    {#if modalPhotos.length > 1}
                        <p class="text-[10px] text-[#f4acb7] font-semibold pt-1">
                            Foto {selectedImageIndex + 1} dari {modalPhotos.length}
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</section>
