<script>
    import { viewport } from '$lib/actions/viewport.js';
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

    /** @type {{ image_url?: string, image_urls?: string[], caption?: string, story?: string } | null} */
    let selectedCard = $state(null);
    let selectedImageIndex = $state(0);

    /** @type {Record<string | number, number>} */
    let activeCardPhotoIndices = $state({});

    /**
     * @param {string|number} cardId
     * @param {number} totalPhotos
     * @param {number} direction
     */
    function slidePhoto(cardId, totalPhotos, direction) {
        const current = activeCardPhotoIndices[cardId] || 0;
        let next = current + direction;
        if (next < 0) next = totalPhotos - 1;
        if (next >= totalPhotos) next = 0;
        activeCardPhotoIndices[cardId] = next;
    }

    /**
     * @param {{ image_url?: string, image_urls?: string[], caption?: string, story?: string }} card
     * @param {number} photoIdx
     */
    function openLightbox(card, photoIdx = 0) {
        selectedCard = card;
        selectedImageIndex = photoIdx;
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

<svelte:window onkeydown={handleKeyDown} />

<section 
    id="gallery" 
    use:viewport={{ threshold: 0.1 }}
    onenterViewport={() => isVisible = true}
    class="py-20 px-4 max-w-6xl mx-auto"
>
    <!-- Header -->
    <div class="text-center space-y-3 mb-16">
        <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Album Kenangan</span>
        <h2 class="font-serif-title text-3xl md:text-5xl font-bold text-[#4a3b32] tracking-wide">
            Kartu Cerita Foto & Kenangan
        </h2>
        <p class="text-xs md:text-sm text-[#4a3b32]/70 italic font-medium">
            Potret kisah manis yang dapat di-slide dan dibaca penjelasannya
        </p>
        <div class="w-16 h-0.5 bg-[#f4acb7] mx-auto rounded-full mt-2"></div>
    </div>

    {#if isVisible}
        <!-- Grid Photo Story Cards -->
        <div 
            in:fade={{ duration: 800 }}
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {#each items as item, idx (item.id || item.image_url || idx)}
                {@const photos = item.image_urls && item.image_urls.length > 0 ? item.image_urls : [item.image_url]}
                {@const currentIdx = activeCardPhotoIndices[item.id || idx] || 0}
                
                <div 
                    in:fly={{ y: 30, duration: 700, delay: idx * 100 }}
                    class="bg-white/90 backdrop-blur-sm border border-[#f4acb7]/30 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                    <!-- Photo Container / Carousel Slider -->
                    <div class="relative w-full h-64 overflow-hidden bg-black/5">
                        <!-- Active Image -->
                        <button
                            type="button"
                            onclick={() => openLightbox(item, currentIdx)}
                            class="w-full h-full text-left focus:outline-none cursor-pointer"
                            aria-label={`Buka foto ${item.caption || 'kenangan'}`}
                        >
                            <img 
                                src={photos[currentIdx]} 
                                alt={item.caption || 'Foto Kenangan Cinta'}
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </button>

                        <!-- Slide Navigation Arrows (If card has > 1 photo) -->
                        {#if photos.length > 1}
                            <button
                                type="button"
                                onclick={(e) => { e.stopPropagation(); slidePhoto(item.id || idx, photos.length, -1); }}
                                class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center text-sm shadow-md transition-colors z-10"
                                aria-label="Foto Sebelumnya"
                            >
                                ❮
                            </button>

                            <button
                                type="button"
                                onclick={(e) => { e.stopPropagation(); slidePhoto(item.id || idx, photos.length, 1); }}
                                class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center text-sm shadow-md transition-colors z-10"
                                aria-label="Foto Selanjutnya"
                            >
                                ❯
                            </button>

                            <!-- Slide Dots Indicator -->
                            <div class="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10 pointer-events-none">
                                {#each photos as _, pIdx}
                                    <span class="w-2 h-2 rounded-full transition-all duration-300 {currentIdx === pIdx ? 'bg-white scale-125 shadow-md' : 'bg-white/50'}"></span>
                                {/each}
                            </div>
                        {/if}

                        <div class="absolute top-3 right-3 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold text-[#4a3b32] shadow-xs pointer-events-none">
                            🖼️ {photos.length} Foto
                        </div>
                    </div>

                    <!-- Story Explanation Underneath -->
                    <div class="p-6 flex-1 flex flex-col justify-between space-y-3 text-center border-t border-[#f4acb7]/20 bg-[#fdf8f5]/50">
                        <h3 class="font-serif-title text-xl font-bold text-[#4a3b32]">
                            {item.caption || 'Momen Spesial'}
                        </h3>
                        <p class="text-xs text-[#4a3b32]/80 leading-relaxed font-body italic">
                            "{item.story || 'Catatan indah kebersamaan dan kenangan manis yang tersimpan di dalam hati.'}"
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    {/if}

    <!-- Lightbox Modal -->
    {#if selectedCard}
        {@const modalPhotos = selectedCard.image_urls && selectedCard.image_urls.length > 0 ? selectedCard.image_urls : [selectedCard.image_url]}
        
        <div 
            transition:fade={{ duration: 300 }}
            onclick={closeLightbox}
            role="presentation"
            class="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
            <div 
                transition:scale={{ duration: 300 }}
                onclick={(e) => e.stopPropagation()}
                role="presentation"
                class="relative max-w-4xl max-h-[90vh] bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl flex flex-col items-center space-y-4 overflow-hidden border border-[#f4acb7]/30"
            >
                <button 
                    type="button"
                    onclick={closeLightbox}
                    class="absolute top-4 right-4 z-10 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors text-xs"
                    aria-label="Tutup foto"
                >
                    ✕
                </button>
                
                <!-- Main Lightbox Photo -->
                <div class="relative max-w-full max-h-[70vh] flex items-center justify-center">
                    <img 
                        src={modalPhotos[selectedImageIndex]} 
                        alt={selectedCard.caption || 'Foto Galeri'} 
                        class="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-md"
                    />

                    {#if modalPhotos.length > 1}
                        <button
                            type="button"
                            onclick={() => selectedImageIndex = (selectedImageIndex - 1 + modalPhotos.length) % modalPhotos.length}
                            class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center text-base shadow-md transition-colors"
                        >
                            ❮
                        </button>
                        <button
                            type="button"
                            onclick={() => selectedImageIndex = (selectedImageIndex + 1) % modalPhotos.length}
                            class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center text-base shadow-md transition-colors"
                        >
                            ❯
                        </button>
                    {/if}
                </div>

                <div class="text-center space-y-1 max-w-2xl px-4">
                    <h3 class="font-serif-title text-2xl font-bold text-[#4a3b32]">
                        {selectedCard.caption || 'Momen Spesial'}
                    </h3>
                    <p class="text-xs sm:text-sm text-[#4a3b32]/80 italic">
                        "{selectedCard.story || 'Kenangan manis yang tersimpan di hati.'}"
                    </p>
                    {#if modalPhotos.length > 1}
                        <p class="text-[10px] text-[#f4acb7] font-bold">
                            Foto {selectedImageIndex + 1} dari {modalPhotos.length}
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</section>
