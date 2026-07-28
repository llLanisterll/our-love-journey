<script>
    import { viewport } from '$lib/actions/viewport.js';
    import { fade, fly, scale } from 'svelte/transition';

    let { galleryItems = [] } = $props();

    const defaultGallery = [
        { id: '1', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', caption: 'Kencan Pertama di Kedai Kopi', story: 'Hari di mana perbincangan canggung kita berubah menjadi tawa hangat yang tak terlupakan.' },
        { id: '2', image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', caption: 'Menikmati Senja Bersama', story: 'Duduk berdua menyaksikan warna langit berganti, merasa bersyukur atas kehadiran satu sama lain.' },
        { id: '3', image_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80', caption: 'Senyuman & Tawa Bahagia', story: 'Setiap detik bersamamu selalu dipenuhi kehangatan dan senyuman yang tulus.' },
        { id: '4', image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', caption: 'Melangkah Bersama', story: 'Bergandengan tangan melintasi waktu, siap menghadapi setiap tantangan kehidupan.' },
        { id: '5', image_url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=800&q=80', caption: 'Momen Perayaan Spesial', story: 'Merayakan hari bahagia dan mengukir kenangan indah yang selalu tersimpan di hati.' },
        { id: '6', image_url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80', caption: 'Janji Kebersamaan Abadi', story: 'Kisah cinta yang akan terus tumbuh dan menjadi cerita abadi sampai kapan pun.' }
    ];

    let items = $derived(galleryItems.length > 0 ? galleryItems : defaultGallery);

    let isVisible = $state(false);

    /** @type {{ image_url: string, caption?: string, story?: string } | null} */
    let selectedImage = $state(null);

    /**
     * @param {{ image_url: string, caption?: string, story?: string }} item
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
    use:viewport={{ threshold: 0.1 }}
    onenterViewport={() => isVisible = true}
    class="py-20 px-4 max-w-6xl mx-auto"
>
    <!-- Header -->
    <div class="text-center space-y-3 mb-16">
        <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Album Kenangan</span>
        <h2 class="font-serif-title text-3xl md:text-5xl font-bold text-[#4a3b32] tracking-wide">
            Foto Kenangan & Catatan Cerita
        </h2>
        <p class="text-xs md:text-sm text-[#4a3b32]/70 italic font-medium">
            Potret momen berharga dan kisah di balik setiap senyuman
        </p>
        <div class="w-16 h-0.5 bg-[#f4acb7] mx-auto rounded-full mt-2"></div>
    </div>

    {#if isVisible}
        <!-- Grid Photo Cards with Stories underneath -->
        <div 
            in:fade={{ duration: 800 }}
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {#each items as item, idx (item.id || item.image_url)}
                <div 
                    in:fly={{ y: 30, duration: 700, delay: idx * 100 }}
                    class="bg-white/90 backdrop-blur-sm border border-[#f4acb7]/30 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                    <!-- Photo Container -->
                    <button
                        type="button"
                        onclick={() => openLightbox(item)}
                        class="relative w-full h-64 overflow-hidden focus:outline-none cursor-pointer"
                        aria-label={`Buka foto ${item.caption || 'kenangan'}`}
                    >
                        <img 
                            src={item.image_url} 
                            alt={item.caption || 'Foto Kenangan Cinta'}
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                        <div class="absolute bottom-3 right-3 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold text-[#4a3b32] shadow-xs">
                            🔍 Perbesar
                        </div>
                    </button>

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
                
                <img 
                    src={selectedImage.image_url} 
                    alt={selectedImage.caption || 'Foto Galeri'} 
                    class="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-md"
                />

                <div class="text-center space-y-1 max-w-2xl px-4">
                    <h3 class="font-serif-title text-2xl font-bold text-[#4a3b32]">
                        {selectedImage.caption || 'Momen Spesial'}
                    </h3>
                    <p class="text-xs sm:text-sm text-[#4a3b32]/80 italic">
                        "{selectedImage.story || 'Kenangan manis yang tersimpan di hati.'}"
                    </p>
                </div>
            </div>
        </div>
    {/if}
</section>
