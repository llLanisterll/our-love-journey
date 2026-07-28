<script>
    import { viewport } from '$lib/actions/viewport.js';
    import { fade, scale } from 'svelte/transition';

    let { galleryItems = [] } = $props();

    const defaultGallery = [
        { id: '1', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80', caption: 'Kebersamaan Indah' },
        { id: '2', image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80', caption: 'Momen Senja' },
        { id: '3', image_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80', caption: 'Senyuman Bahagia' },
        { id: '4', image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80', caption: 'Langkah Bersama' },
        { id: '5', image_url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=600&q=80', caption: 'Kenangan Manis' },
        { id: '6', image_url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80', caption: 'Kencan Pertama' }
    ];

    let items = $derived(galleryItems.length > 0 ? galleryItems : defaultGallery);

    let isVisible = $state(false);

    /** @type {{ image_url: string, caption?: string } | null} */
    let selectedImage = $state(null);

    /**
     * @param {{ image_url: string, caption?: string }} item
     */
    function openLightbox(item) {
        selectedImage = item;
    }

    function closeLightbox() {
        selectedImage = null;
    }

    /**
     * @param {KeyboardEvent} e
     */
    function handleKeyDown(e) {
        if (e.key === 'Escape' && selectedImage) {
            closeLightbox();
        }
    }
</script>

<svelte:window onkeydown={handleKeyDown} />

<section 
    id="gallery" 
    use:viewport={{ threshold: 0.15 }}
    onenterViewport={() => isVisible = true}
    class="py-20 px-4 max-w-6xl mx-auto"
>
    <!-- Header -->
    <div class="text-center space-y-3 mb-12">
        <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Galeri Foto</span>
        <h2 class="font-serif-title text-3xl md:text-5xl font-bold text-[#4a3b32] tracking-wide">
            Galeri Kenangan (Memories)
        </h2>
        <div class="w-16 h-0.5 bg-[#f4acb7] mx-auto rounded-full mt-2"></div>
    </div>

    {#if isVisible}
        <!-- Grid Masonry -->
        <div 
            in:fade={{ duration: 800 }}
            class="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6"
        >
            {#each items as item (item.id || item.image_url)}
                <button
                    type="button"
                    onclick={() => openLightbox(item)}
                    class="w-full text-left group break-inside-avoid relative overflow-hidden rounded-2xl border border-[#f4acb7]/30 shadow-xs hover:shadow-xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#f4acb7]"
                    aria-label={`Buka foto ${item.caption || 'galeri'}`}
                >
                    <img 
                        src={item.image_url} 
                        alt={item.caption || 'Galeri Foto Pasangan'}
                        class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-[#4a3b32]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p class="text-white font-serif-title text-sm md:text-base font-semibold drop-shadow-md">
                            {item.caption || 'Memory'}
                        </p>
                    </div>
                </button>
            {/each}
        </div>
    {/if}

    <!-- Lightbox Modal -->
    {#if selectedImage}
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
                class="relative max-w-4xl max-h-[90vh] bg-transparent rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
            >
                <button 
                    type="button"
                    onclick={closeLightbox}
                    class="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="Tutup foto"
                >
                    ✕
                </button>
                
                <img 
                    src={selectedImage.image_url} 
                    alt={selectedImage.caption || 'Foto Galeri'} 
                    class="max-w-full max-h-[80vh] object-contain rounded-lg"
                />

                {#if selectedImage.caption}
                    <p class="mt-3 text-center text-white font-serif-title text-lg px-4">
                        {selectedImage.caption}
                    </p>
                {/if}
            </div>
        </div>
    {/if}
</section>
