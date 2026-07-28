<script>
    import { enhance } from '$app/forms';
    import { fade, slide } from 'svelte/transition';

    let { data, form } = $props();

    let activeTab = $state('config'); // 'config' | 'media' | 'audio' | 'chapters' | 'timeline' | 'spots' | 'gallery'
    let isSubmitting = $state(false);

    // Dynamic tabs definition using $derived
    let tabs = $derived([
        { id: 'config', name: 'Profil & Pasangan', icon: '👤' },
        { id: 'media', name: 'Sampul & Foto Utama', icon: '🖼️' },
        { id: 'audio', name: 'Musik Latar (.mp3)', icon: '🎵' },
        { id: 'chapters', name: 'Bab Cerita Cinta', icon: '📖', badge: data.chapters ? data.chapters.length : 0 },
        { id: 'timeline', name: 'Garis Waktu', icon: '⏳', badge: data.timeline ? data.timeline.length : 0 },
        { id: 'spots', name: 'Tempat Kenangan', icon: '📍' },
        { id: 'gallery', name: 'Galeri Memories', icon: '📸', badge: data.gallery ? data.gallery.length : 0 }
    ]);
</script>

<svelte:head>
    <title>Admin Dashboard CMS - Perjalanan Cinta Pasangan</title>
</svelte:head>

<div class="min-h-screen bg-[#fdf8f5] text-[#3d2e28] font-body selection:bg-[#f4acb7]/30 pb-16">

    <!-- Topbar Navigation -->
    <header class="bg-white/80 backdrop-blur-md border-b border-[#f4acb7]/30 sticky top-0 z-30 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <!-- Brand & User Status -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f4acb7] to-[#e8d8c8] flex items-center justify-center text-[#4a3b32] font-bold shadow-md">
                    💖
                </div>
                <div>
                    <h1 class="font-serif-title text-xl font-bold text-[#4a3b32]">Dashboard CMS Pasangan</h1>
                    <p class="text-xs text-[#4a3b32]/70 flex items-center space-x-1">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                        <span>{data.user?.email || 'Admin Logged In'}</span>
                    </p>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center space-x-3">
                <a 
                    href="/" 
                    target="_blank"
                    class="px-4 py-2 bg-[#fff0f3] hover:bg-[#ffe5ec] text-[#4a3b32] text-xs font-bold rounded-xl border border-[#f4acb7]/40 shadow-xs transition-all flex items-center space-x-1.5 active:scale-95"
                >
                    <span>👁️ Lihat Web Public</span>
                </a>

                <form method="POST" action="?/logout" use:enhance>
                    <button 
                        type="submit"
                        class="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-all active:scale-95"
                    >
                        Keluar
                    </button>
                </form>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8 space-y-6">

        <!-- Toast Notifications -->
        {#if form?.error}
            <div transition:slide class="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-sm flex items-center space-x-3 shadow-xs">
                <span class="text-xl">⚠️</span>
                <span class="font-medium">{form.error}</span>
            </div>
        {/if}

        {#if form?.success}
            <div transition:slide class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm flex items-center space-x-3 shadow-xs">
                <span class="text-xl">✨</span>
                <span class="font-medium">{form.success}</span>
            </div>
        {/if}

        <!-- Navigation Tabs Bar -->
        <div class="bg-white/60 backdrop-blur-sm border border-[#f4acb7]/30 rounded-2xl p-2 shadow-xs overflow-x-auto flex space-x-1 scrollbar-none">
            {#each tabs as tab}
                <button 
                    type="button"
                    onclick={() => activeTab = tab.id}
                    class="px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center space-x-2 whitespace-nowrap active:scale-95 {activeTab === tab.id ? 'bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] text-white shadow-md' : 'text-[#4a3b32]/80 hover:bg-[#fff0f3]'}"
                >
                    <span class="text-base">{tab.icon}</span>
                    <span>{tab.name}</span>
                    {#if tab.badge !== undefined}
                        <span class="ml-1 px-2 py-0.5 text-[10px] rounded-full {activeTab === tab.id ? 'bg-white/30 text-white' : 'bg-[#fff0f3] text-[#f4acb7]'}">
                            {tab.badge}
                        </span>
                    {/if}
                </button>
            {/each}
        </div>

        <!-- TAB 1: PROFIL & PASANGAN -->
        {#if activeTab === 'config'}
            <div transition:fade={{ duration: 200 }} class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                <div class="flex items-center space-x-3 border-b border-[#f4acb7]/20 pb-4">
                    <span class="text-2xl">👤</span>
                    <div>
                        <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Pengaturan Profil & Pasangan</h2>
                        <p class="text-xs text-[#4a3b32]/70">Atur nama pasangan, tanggal mulai kebersamaan, dan quote romantis utama.</p>
                    </div>
                </div>

                <form method="POST" action="?/updateConfig" use:enhance={() => { isSubmitting = true; return async ({ update }) => { isSubmitting = false; update(); }; }} class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="groom_name" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-2">
                                Nama Pasangan (Pria)
                            </label>
                            <input 
                                type="text" 
                                id="groom_name" 
                                name="groom_name" 
                                value={data.config.groom_name || ''} 
                                required
                                placeholder="Contoh: Bripda Rival"
                                class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f4acb7]"
                            />
                        </div>

                        <div>
                            <label for="bride_name" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-2">
                                Nama Pasangan (Wanita)
                            </label>
                            <input 
                                type="text" 
                                id="bride_name" 
                                name="bride_name" 
                                value={data.config.bride_name || ''} 
                                required
                                placeholder="Contoh: Siti"
                                class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f4acb7]"
                            />
                        </div>
                    </div>

                    <div>
                        <label for="start_date" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-2">
                            Tanggal Mulai Hubungan / Kebersamaan (Untuk Hitung Hari Otomatis)
                        </label>
                        <input 
                            type="date" 
                            id="start_date" 
                            name="start_date" 
                            value={data.config.start_date || '2021-02-14'} 
                            required
                            class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f4acb7]"
                        />
                    </div>

                    <div>
                        <label for="main_quote" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-2">
                            Quote Utama / Kalimat Cinta Kebersamaan
                        </label>
                        <textarea 
                            id="main_quote" 
                            name="main_quote" 
                            rows="4" 
                            required
                            placeholder="Tuliskan kalimat romantis utama..."
                            class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f4acb7]"
                        >{data.config.main_quote || ''}</textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        class="px-8 py-3.5 bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] hover:brightness-105 text-white font-bold rounded-2xl shadow-md transition-all text-sm disabled:opacity-50"
                    >
                        {isSubmitting ? 'Memproses...' : '💾 Simpan Perubahan Profil'}
                    </button>
                </form>
            </div>
        {/if}

        <!-- TAB 2: SAMPUL & FOTO UTAMA -->
        {#if activeTab === 'media'}
            <div transition:fade={{ duration: 200 }} class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                <div class="flex items-center space-x-3 border-b border-[#f4acb7]/20 pb-4">
                    <span class="text-2xl">🖼️</span>
                    <div>
                        <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Pengaturan Foto Cover & Profil</h2>
                        <p class="text-xs text-[#4a3b32]/70">Unggah foto cover layar pembuka serta foto profil pasangan.</p>
                    </div>
                </div>

                <form method="POST" action="?/uploadMedia" enctype="multipart/form-data" use:enhance class="space-y-8">
                    <!-- Cover Photo -->
                    <div class="space-y-3">
                        <label for="cover_photo" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32]">
                            Foto Cover Layar Pembuka (Full Screen)
                        </label>
                        {#if data.config.cover_photo_url}
                            <div class="w-full h-52 rounded-3xl overflow-hidden border border-[#f4acb7]/30 mb-2 relative group">
                                <img src={data.config.cover_photo_url} alt="Cover Preview" class="w-full h-full object-cover" />
                                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                                    Cover Aktif
                                </div>
                            </div>
                        {/if}
                        <input 
                            type="file" 
                            id="cover_photo" 
                            name="cover_photo" 
                            accept="image/*"
                            class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-xs"
                        />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Groom Photo -->
                        <div class="space-y-3">
                            <label for="groom_photo" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32]">
                                Foto Pasangan Pria
                            </label>
                            {#if data.config.groom_photo_url}
                                <div class="w-36 h-36 rounded-full overflow-hidden border-4 border-[#f4acb7] mb-2 mx-auto shadow-md">
                                    <img src={data.config.groom_photo_url} alt="Groom Preview" class="w-full h-full object-cover" />
                                </div>
                            {/if}
                            <input 
                                type="file" 
                                id="groom_photo" 
                                name="groom_photo" 
                                accept="image/*"
                                class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-xs"
                            />
                        </div>

                        <!-- Bride Photo -->
                        <div class="space-y-3">
                            <label for="bride_photo" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32]">
                                Foto Pasangan Wanita
                            </label>
                            {#if data.config.bride_photo_url}
                                <div class="w-36 h-36 rounded-full overflow-hidden border-4 border-[#f4acb7] mb-2 mx-auto shadow-md">
                                    <img src={data.config.bride_photo_url} alt="Bride Preview" class="w-full h-full object-cover" />
                                </div>
                            {/if}
                            <input 
                                type="file" 
                                id="bride_photo" 
                                name="bride_photo" 
                                accept="image/*"
                                class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-xs"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="px-8 py-3.5 bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] hover:brightness-105 text-white font-bold rounded-2xl shadow-md transition-all text-sm"
                    >
                        📤 Unggah & Perbarui Foto
                    </button>
                </form>
            </div>
        {/if}

        <!-- TAB 3: MUSIK BACKGROUND (.MP3) -->
        {#if activeTab === 'audio'}
            <div transition:fade={{ duration: 200 }} class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                <div class="flex items-center space-x-3 border-b border-[#f4acb7]/20 pb-4">
                    <span class="text-2xl">🎵</span>
                    <div>
                        <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Manajemen Lagu Latar Belakang (.mp3)</h2>
                        <p class="text-xs text-[#4a3b32]/70">Lagu yang diputar otomatis saat undangan/cerita dibuka.</p>
                    </div>
                </div>

                {#if data.config.bg_music_url}
                    <div class="p-5 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-2xl space-y-3">
                        <p class="text-xs font-bold text-[#4a3b32] uppercase tracking-wider">Audio Aktif Saat Ini:</p>
                        <audio controls src={data.config.bg_music_url} class="w-full rounded-xl"></audio>
                    </div>
                {/if}

                <form method="POST" action="?/uploadAudio" enctype="multipart/form-data" use:enhance class="space-y-4">
                    <div>
                        <label for="audio_file" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-2">
                            Pilih File Audio Baru (.mp3)
                        </label>
                        <input 
                            type="file" 
                            id="audio_file" 
                            name="audio_file" 
                            accept="audio/mp3,audio/mpeg"
                            required
                            class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-xs"
                        />
                    </div>

                    <button
                        type="submit"
                        class="px-8 py-3.5 bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] hover:brightness-105 text-white font-bold rounded-2xl shadow-md transition-all text-sm"
                    >
                        🎶 Unggah Musik MP3 Baru
                    </button>
                </form>
            </div>
        {/if}

        <!-- TAB 4: TEMPAT KENANGAN (SPOTS) -->
        {#if activeTab === 'spots'}
            <div transition:fade={{ duration: 200 }} class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                <div class="flex items-center space-x-3 border-b border-[#f4acb7]/20 pb-4">
                    <span class="text-2xl">📍</span>
                    <div>
                        <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Pengaturan Tempat Kenangan Indah</h2>
                        <p class="text-xs text-[#4a3b32]/70">Atur tempat kencan pertama, lokasi perayaan spesial, dan tautan Google Maps.</p>
                    </div>
                </div>

                <form method="POST" action="?/updateConfig" use:enhance class="space-y-8">
                    <!-- Spot 1 -->
                    <div class="p-6 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-2xl space-y-4">
                        <h3 class="font-serif-title text-lg font-bold text-[#4a3b32]">📍 Lokasi Spesial #1 (Misal: Kencan Pertama)</h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="spot1_title" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Judul Tempat</label>
                                <input type="text" id="spot1_title" name="spot1_title" value={data.config.spot1_title || 'Tempat Kencan Pertama'} class="w-full px-4 py-2.5 bg-white border border-[#f4acb7]/30 rounded-xl text-xs" />
                            </div>
                            <div>
                                <label for="spot1_name" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Nama Lokasi / Cafe</label>
                                <input type="text" id="spot1_name" name="spot1_name" value={data.config.spot1_name || 'Kedai Kopi Kenangan Indah'} class="w-full px-4 py-2.5 bg-white border border-[#f4acb7]/30 rounded-xl text-xs" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="spot1_address" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Alamat Lengkap</label>
                                <input type="text" id="spot1_address" name="spot1_address" value={data.config.spot1_address || 'Jl. Romantic No. 123, Kota Bandung'} class="w-full px-4 py-2.5 bg-white border border-[#f4acb7]/30 rounded-xl text-xs" />
                            </div>
                            <div>
                                <label for="spot1_maps_url" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Tautan Google Maps URL</label>
                                <input type="url" id="spot1_maps_url" name="spot1_maps_url" value={data.config.spot1_maps_url || 'https://maps.google.com'} class="w-full px-4 py-2.5 bg-white border border-[#f4acb7]/30 rounded-xl text-xs" />
                            </div>
                        </div>

                        <div>
                            <label for="spot1_desc" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Catatan Kenangan</label>
                            <input type="text" id="spot1_desc" name="spot1_desc" value={data.config.spot1_desc || 'Di mana kecanggungan berubah menjadi tawa.'} class="w-full px-4 py-2.5 bg-white border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>
                    </div>

                    <!-- Spot 2 -->
                    <div class="p-6 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-2xl space-y-4">
                        <h3 class="font-serif-title text-lg font-bold text-[#4a3b32]">📍 Lokasi Spesial #2 (Misal: Tempat Perayaan)</h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="spot2_title" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Judul Tempat</label>
                                <input type="text" id="spot2_title" name="spot2_title" value={data.config.spot2_title || 'Lokasi Perayaan Spesial'} class="w-full px-4 py-2.5 bg-white border border-[#f4acb7]/30 rounded-xl text-xs" />
                            </div>
                            <div>
                                <label for="spot2_name" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Nama Lokasi / Cafe</label>
                                <input type="text" id="spot2_name" name="spot2_name" value={data.config.spot2_name || 'Taman Bunga & Resto Senja'} class="w-full px-4 py-2.5 bg-white border border-[#f4acb7]/30 rounded-xl text-xs" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="spot2_address" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Alamat Lengkap</label>
                                <input type="text" id="spot2_address" name="spot2_address" value={data.config.spot2_address || 'Jl. Panoramic No. 45, Kota Bandung'} class="w-full px-4 py-2.5 bg-white border border-[#f4acb7]/30 rounded-xl text-xs" />
                            </div>
                            <div>
                                <label for="spot2_maps_url" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Tautan Google Maps URL</label>
                                <input type="url" id="spot2_maps_url" name="spot2_maps_url" value={data.config.spot2_maps_url || 'https://maps.google.com'} class="w-full px-4 py-2.5 bg-white border border-[#f4acb7]/30 rounded-xl text-xs" />
                            </div>
                        </div>

                        <div>
                            <label for="spot2_desc" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Catatan Kenangan</label>
                            <input type="text" id="spot2_desc" name="spot2_desc" value={data.config.spot2_desc || 'Tempat impian tempat kami merayakan momen indah.'} class="w-full px-4 py-2.5 bg-white border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="px-8 py-3.5 bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] hover:brightness-105 text-white font-bold rounded-2xl shadow-md transition-all text-sm"
                    >
                        💾 Simpan Semua Lokasi Kenangan
                    </button>
                </form>
            </div>
        {/if}

        <!-- TAB 5: BAB CERITA CINTA (CHAPTERS) -->
        {#if activeTab === 'chapters'}
            <div transition:fade={{ duration: 200 }} class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Form Tambah Chapter Baru -->
                <div class="lg:col-span-1 bg-white border border-[#f4acb7]/30 rounded-3xl p-6 shadow-xs space-y-6 h-fit">
                    <h2 class="font-serif-title text-xl font-bold text-[#4a3b32]">Tambah Bab Cerita Baru</h2>

                    <form method="POST" action="?/addChapter" use:enhance class="space-y-4">
                        <div>
                            <label for="num" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">Bab (Contoh: Bab I)</label>
                            <input type="text" id="num" name="num" placeholder="Bab I" required class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="title" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">Judul Bab</label>
                            <input type="text" id="title" name="title" placeholder="Pertemuan Pertama" required class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="subtitle" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">Sub Judul</label>
                            <input type="text" id="subtitle" name="subtitle" placeholder="Awal Dari Semua Cerita" class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="icon" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">Ikon Emoji</label>
                            <input type="text" id="icon" name="icon" value="🌱" class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="story" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">Isi Cerita Bab</label>
                            <textarea id="story" name="story" rows="4" placeholder="Tuliskan kisah bab ini..." required class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"></textarea>
                        </div>

                        <div>
                            <label for="order_index" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">Urutan Bab</label>
                            <input type="number" id="order_index" name="order_index" value={data.chapters.length + 1} class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <button type="submit" class="w-full py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold rounded-xl shadow-md transition-all text-xs">
                            + Tambah Bab Cerita
                        </button>
                    </form>
                </div>

                <!-- Daftar Chapter Aktif -->
                <div class="lg:col-span-2 bg-white border border-[#f4acb7]/30 rounded-3xl p-6 shadow-xs space-y-6">
                    <h2 class="font-serif-title text-xl font-bold text-[#4a3b32]">Daftar Bab Cerita Aktif</h2>

                    {#if data.chapters.length === 0}
                        <p class="text-xs text-gray-500 italic py-8 text-center">Belum ada bab cerita kustom di database (Sistem menampilkan 4 bab cerita default).</p>
                    {:else}
                        <div class="space-y-4">
                            {#each data.chapters as ch (ch.id)}
                                <div class="p-4 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl flex items-start justify-between gap-4 shadow-2xs">
                                    <div class="space-y-1">
                                        <span class="inline-block px-2.5 py-0.5 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-full text-[10px] font-bold text-[#f4acb7]">
                                            {ch.num} - {ch.icon} (Urutan: {ch.order_index})
                                        </span>
                                        <h3 class="font-serif-title font-bold text-base text-[#4a3b32]">{ch.title}</h3>
                                        <p class="text-xs italic text-[#f4acb7]">{ch.subtitle}</p>
                                        <p class="text-xs text-[#4a3b32]/80 leading-relaxed">{ch.story}</p>
                                    </div>

                                    <form method="POST" action="?/deleteChapter" use:enhance>
                                        <input type="hidden" name="id" value={ch.id} />
                                        <button 
                                            type="submit" 
                                            onclick={(e) => !confirm('Hapus bab cerita ini?') && e.preventDefault()}
                                            class="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-xs font-semibold transition-colors"
                                        >
                                            Hapus
                                        </button>
                                    </form>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        {/if}

        <!-- TAB 6: TIMELINE CERITA -->
        {#if activeTab === 'timeline'}
            <div transition:fade={{ duration: 200 }} class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Form Tambah Timeline Baru -->
                <div class="lg:col-span-1 bg-white border border-[#f4acb7]/30 rounded-3xl p-6 shadow-xs space-y-6 h-fit">
                    <h2 class="font-serif-title text-xl font-bold text-[#4a3b32]">Tambah Momen Cerita</h2>

                    <form method="POST" action="?/addTimeline" use:enhance class="space-y-4">
                        <div>
                            <label for="date_label" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                                Label Tanggal
                            </label>
                            <input 
                                type="text" 
                                id="date_label" 
                                name="date_label" 
                                placeholder="Contoh: 14 Februari 2021"
                                required
                                class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            />
                        </div>

                        <div>
                            <label for="title" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                                Judul Momen
                            </label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                placeholder="Contoh: Kencan Pertama"
                                required
                                class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            />
                        </div>

                        <div>
                            <label for="description" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                                Deskripsi Cerita
                            </label>
                            <textarea 
                                id="description" 
                                name="description" 
                                rows="3" 
                                placeholder="Tuliskan momen indah..."
                                required
                                class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            ></textarea>
                        </div>

                        <div>
                            <label for="order_index" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                                Urutan Tampil
                            </label>
                            <input 
                                type="number" 
                                id="order_index" 
                                name="order_index" 
                                value={data.timeline.length + 1}
                                class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            />
                        </div>

                        <button
                            type="submit"
                            class="w-full py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold rounded-xl shadow-md transition-all text-xs"
                        >
                            + Tambah Ke Timeline
                        </button>
                    </form>
                </div>

                <!-- Lista Timeline Aktif -->
                <div class="lg:col-span-2 bg-white border border-[#f4acb7]/30 rounded-3xl p-6 shadow-xs space-y-6">
                    <h2 class="font-serif-title text-xl font-bold text-[#4a3b32]">Daftar Timeline Aktif</h2>

                    {#if data.timeline.length === 0}
                        <p class="text-xs text-gray-500 italic py-8 text-center">Belum ada data timeline. Tambahkan momen cerita baru di form sebelah kiri.</p>
                    {:else}
                        <div class="space-y-4">
                            {#each data.timeline as item (item.id)}
                                <div class="p-4 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl flex items-start justify-between gap-4 shadow-2xs">
                                    <div class="space-y-1">
                                        <span class="inline-block px-2.5 py-0.5 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-full text-[10px] font-bold text-[#f4acb7]">
                                            {item.date_label} (Urutan: {item.order_index})
                                        </span>
                                        <h3 class="font-serif-title font-bold text-base text-[#4a3b32]">{item.title}</h3>
                                        <p class="text-xs text-[#4a3b32]/80">{item.description}</p>
                                    </div>

                                    <form method="POST" action="?/deleteTimeline" use:enhance>
                                        <input type="hidden" name="id" value={item.id} />
                                        <button 
                                            type="submit" 
                                            onclick={(e) => !confirm('Yakin ingin menghapus momen ini?') && e.preventDefault()}
                                            class="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-xs font-semibold transition-colors"
                                        >
                                            Hapus
                                        </button>
                                    </form>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        {/if}

        <!-- TAB 7: GALERI MEMORIES -->
        {#if activeTab === 'gallery'}
            <div transition:fade={{ duration: 200 }} class="space-y-8">
                <!-- Form Multi Upload -->
                <div class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                    <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Unggah Foto Galeri (Bisa Banyak Foto Sekaligus)</h2>

                    <form method="POST" action="?/uploadGallery" enctype="multipart/form-data" use:enhance class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="gallery_files" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-2">
                                    Pilih File Foto (Drag & Drop atau Klik)
                                </label>
                                <input 
                                    type="file" 
                                    id="gallery_files" 
                                    name="gallery_files" 
                                    accept="image/*"
                                    multiple
                                    required
                                    class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-xs cursor-pointer"
                                />
                            </div>

                            <div>
                                <label for="caption" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-2">
                                    Caption Opsional
                                </label>
                                <input 
                                    type="text" 
                                    id="caption" 
                                    name="caption" 
                                    placeholder="Contoh: Liburan Bersama di Bali"
                                    class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-xs"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="px-8 py-3.5 bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] hover:brightness-105 text-white font-bold rounded-2xl shadow-md transition-all text-sm"
                        >
                            📤 Unggah Banyak Foto Ke Galeri
                        </button>
                    </form>
                </div>

                <!-- Grid Galeri Aktif -->
                <div class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                    <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Daftar Foto Galeri Aktif ({data.gallery.length})</h2>

                    {#if data.gallery.length === 0}
                        <p class="text-xs text-gray-500 italic py-8 text-center">Belum ada foto di galeri. Unggah foto baru menggunakan form di atas.</p>
                    {:else}
                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {#each data.gallery as photo (photo.id)}
                                <div class="relative group rounded-2xl overflow-hidden border border-[#f4acb7]/30 shadow-xs bg-[#fdf8f5]">
                                    <img src={photo.image_url} alt={photo.caption} class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div class="p-2 text-center bg-white/90">
                                        <p class="text-[11px] truncate font-semibold text-[#4a3b32]">{photo.caption || 'Foto'}</p>
                                    </div>
                                    <form method="POST" action="?/deleteGallery" use:enhance class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <input type="hidden" name="id" value={photo.id} />
                                        <button 
                                            type="submit" 
                                            onclick={(e) => !confirm('Hapus foto ini dari galeri?') && e.preventDefault()}
                                            class="w-8 h-8 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center text-xs shadow-md active:scale-95"
                                            aria-label="Hapus Foto"
                                        >
                                            ✕
                                        </button>
                                    </form>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        {/if}

    </main>
</div>
