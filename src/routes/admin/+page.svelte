<script>
    import { enhance } from '$app/forms';
    import { fade, slide } from 'svelte/transition';

    let { data, form } = $props();

    let activeTab = $state('config'); // 'config' | 'media' | 'audio' | 'chapters' | 'timeline' | 'spots' | 'gallery'
    let isSubmitting = $state(false);

    // Dynamic tabs definition using $derived
    let tabs = $derived([
        { id: 'config', name: 'Profil', icon: '👤' },
        { id: 'media', name: 'Media & Cover', icon: '🖼️' },
        { id: 'audio', name: 'Musik MP3', icon: '🎵' },
        { id: 'chapters', name: 'Bab Cerita', icon: '📖', badge: data.chapters ? data.chapters.length : 0 },
        { id: 'timeline', name: 'Garis Waktu', icon: '⏳', badge: data.timeline ? data.timeline.length : 0 },
        { id: 'gallery', name: 'Kartu Cerita Foto', icon: '📸', badge: data.gallery ? data.gallery.length : 0 }
    ]);
</script>

<svelte:head>
    <title>Admin Dashboard CMS - Perjalanan Cinta Pasangan</title>
</svelte:head>

<div class="min-h-screen bg-[#fdf8f5] text-[#3d2e28] font-body selection:bg-[#f4acb7]/30 pb-24 md:pb-16">

    <!-- Mobile-First Topbar Navigation -->
    <header class="bg-white/90 backdrop-blur-md border-b border-[#f4acb7]/30 sticky top-0 z-30 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
            
            <!-- Brand & User Status -->
            <div class="flex items-center space-x-2.5">
                <div class="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#f4acb7] to-[#e8d8c8] flex items-center justify-center text-[#4a3b32] font-bold shadow-sm text-base">
                    💖
                </div>
                <div>
                    <h1 class="font-serif-title text-base sm:text-lg font-bold text-[#4a3b32] leading-tight">Admin CMS</h1>
                    <p class="text-[10px] text-[#4a3b32]/70 truncate max-w-[130px] sm:max-w-none">
                        {data.user?.email || 'Admin Logged In'}
                    </p>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center space-x-2">
                <a 
                    href="/" 
                    target="_blank"
                    class="px-3 py-1.5 bg-[#fff0f3] hover:bg-[#ffe5ec] text-[#4a3b32] text-xs font-bold rounded-xl border border-[#f4acb7]/40 shadow-xs transition-all flex items-center space-x-1 active:scale-95"
                >
                    <span>👁️ Lihat Web</span>
                </a>

                <form method="POST" action="?/logout" use:enhance>
                    <button 
                        type="submit"
                        class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-all active:scale-95"
                    >
                        Keluar
                    </button>
                </form>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-5">

        <!-- Toast Notifications -->
        {#if form?.error}
            <div transition:slide class="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs sm:text-sm flex items-center space-x-2.5 shadow-xs">
                <span class="text-lg">⚠️</span>
                <span class="font-medium leading-tight">{form.error}</span>
            </div>
        {/if}

        {#if form?.success}
            <div transition:slide class="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm flex items-center space-x-2.5 shadow-xs">
                <span class="text-lg">✨</span>
                <span class="font-medium leading-tight">{form.success}</span>
            </div>
        {/if}

        <!-- Mobile Scrollable Tab Bar -->
        <div class="bg-white/80 backdrop-blur-md border border-[#f4acb7]/30 rounded-2xl p-1.5 shadow-xs overflow-x-auto flex space-x-1 scrollbar-none sticky top-14 z-20">
            {#each tabs as tab}
                <button 
                    type="button"
                    onclick={() => activeTab = tab.id}
                    class="px-3.5 py-2 rounded-xl font-bold text-xs transition-all duration-200 flex items-center space-x-1.5 whitespace-nowrap active:scale-95 {activeTab === tab.id ? 'bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] text-white shadow-sm' : 'text-[#4a3b32]/80 hover:bg-[#fff0f3]'}"
                >
                    <span class="text-sm">{tab.icon}</span>
                    <span>{tab.name}</span>
                    {#if tab.badge !== undefined}
                        <span class="ml-0.5 px-1.5 py-0.2 text-[9px] rounded-full {activeTab === tab.id ? 'bg-white/30 text-white' : 'bg-[#fff0f3] text-[#f4acb7]'}">
                            {tab.badge}
                        </span>
                    {/if}
                </button>
            {/each}
        </div>

        <!-- TAB 1: PROFIL & PASANGAN -->
        {#if activeTab === 'config'}
            <div transition:fade={{ duration: 200 }} class="bg-white border border-[#f4acb7]/30 rounded-3xl p-5 sm:p-8 shadow-xs space-y-5">
                <div class="flex items-center space-x-3 border-b border-[#f4acb7]/20 pb-3.5">
                    <span class="text-2xl">👤</span>
                    <div>
                        <h2 class="font-serif-title text-xl sm:text-2xl font-bold text-[#4a3b32]">Profil Pasangan</h2>
                        <p class="text-[11px] sm:text-xs text-[#4a3b32]/70">Atur nama pasangan, tanggal mulai kebersamaan, dan quote utama.</p>
                    </div>
                </div>

                <form method="POST" action="?/updateConfig" use:enhance={() => { isSubmitting = true; return async ({ update }) => { isSubmitting = false; update(); }; }} class="space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <label for="groom_name" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
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
                            <label for="bride_name" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
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
                        <label for="start_date" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                            Tanggal Mulai Hubungan / Kebersamaan (Hitung Hari Otomatis)
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
                        <label for="main_quote" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
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
                        class="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] hover:brightness-105 text-white font-bold rounded-2xl shadow-md transition-all text-sm disabled:opacity-50 active:scale-95"
                    >
                        {isSubmitting ? 'Memproses...' : '💾 Simpan Perubahan Profil'}
                    </button>
                </form>
            </div>
        {/if}

        <!-- TAB 2: SAMPUL & FOTO UTAMA -->
        {#if activeTab === 'media'}
            <div transition:fade={{ duration: 200 }} class="bg-white border border-[#f4acb7]/30 rounded-3xl p-5 sm:p-8 shadow-xs space-y-5">
                <div class="flex items-center space-x-3 border-b border-[#f4acb7]/20 pb-3.5">
                    <span class="text-2xl">🖼️</span>
                    <div>
                        <h2 class="font-serif-title text-xl sm:text-2xl font-bold text-[#4a3b32]">Foto Cover & Profil</h2>
                        <p class="text-[11px] sm:text-xs text-[#4a3b32]/70">Unggah foto cover layar pembuka serta foto profil pasangan.</p>
                    </div>
                </div>

                <form method="POST" action="?/uploadMedia" enctype="multipart/form-data" use:enhance class="space-y-6">
                    <!-- Cover Photo -->
                    <div class="space-y-2.5">
                        <label for="cover_photo" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32]">
                            Foto Cover Layar Pembuka (Full Screen)
                        </label>
                        {#if data.config.cover_photo_url}
                            <div class="w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-[#f4acb7]/30 mb-2 relative group">
                                <img src={data.config.cover_photo_url} alt="Cover Preview" class="w-full h-full object-cover" />
                            </div>
                        {/if}
                        <input 
                            type="file" 
                            id="cover_photo" 
                            name="cover_photo" 
                            accept="image/*"
                            class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-xs cursor-pointer"
                        />
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <!-- Groom Photo -->
                        <div class="space-y-2.5">
                            <label for="groom_photo" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32]">
                                Foto Pasangan Pria
                            </label>
                            {#if data.config.groom_photo_url}
                                <div class="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#f4acb7] mb-2 mx-auto shadow-md">
                                    <img src={data.config.groom_photo_url} alt="Groom Preview" class="w-full h-full object-cover" />
                                </div>
                            {/if}
                            <input 
                                type="file" 
                                id="groom_photo" 
                                name="groom_photo" 
                                accept="image/*"
                                class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-xs cursor-pointer"
                            />
                        </div>

                        <!-- Bride Photo -->
                        <div class="space-y-2.5">
                            <label for="bride_photo" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32]">
                                Foto Pasangan Wanita
                            </label>
                            {#if data.config.bride_photo_url}
                                <div class="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#f4acb7] mb-2 mx-auto shadow-md">
                                    <img src={data.config.bride_photo_url} alt="Bride Preview" class="w-full h-full object-cover" />
                                </div>
                            {/if}
                            <input 
                                type="file" 
                                id="bride_photo" 
                                name="bride_photo" 
                                accept="image/*"
                                class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-xs cursor-pointer"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] hover:brightness-105 text-white font-bold rounded-2xl shadow-md transition-all text-sm active:scale-95"
                    >
                        📤 Unggah & Perbarui Foto
                    </button>
                </form>
            </div>
        {/if}

        <!-- TAB 3: MUSIK BACKGROUND (.MP3) -->
        {#if activeTab === 'audio'}
            <div transition:fade={{ duration: 200 }} class="bg-white border border-[#f4acb7]/30 rounded-3xl p-5 sm:p-8 shadow-xs space-y-5">
                <div class="flex items-center space-x-3 border-b border-[#f4acb7]/20 pb-3.5">
                    <span class="text-2xl">🎵</span>
                    <div>
                        <h2 class="font-serif-title text-xl sm:text-2xl font-bold text-[#4a3b32]">Musik Latar (.mp3)</h2>
                        <p class="text-[11px] sm:text-xs text-[#4a3b32]/70">Lagu yang diputar otomatis saat cerita dibuka.</p>
                    </div>
                </div>

                {#if data.config.bg_music_url}
                    <div class="p-4 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-2xl space-y-2.5">
                        <p class="text-xs font-bold text-[#4a3b32] uppercase tracking-wider">Audio Aktif Saat Ini:</p>
                        <audio controls src={data.config.bg_music_url} class="w-full rounded-xl"></audio>
                    </div>
                {/if}

                <form method="POST" action="?/uploadAudio" enctype="multipart/form-data" use:enhance class="space-y-4">
                    <div>
                        <label for="audio_file" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                            Pilih File Audio Baru (.mp3)
                        </label>
                        <input 
                            type="file" 
                            id="audio_file" 
                            name="audio_file" 
                            accept="audio/mp3,audio/mpeg"
                            required
                            class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl text-xs cursor-pointer"
                        />
                    </div>

                    <button
                        type="submit"
                        class="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] hover:brightness-105 text-white font-bold rounded-2xl shadow-md transition-all text-sm active:scale-95"
                    >
                        🎶 Unggah Musik MP3 Baru
                    </button>
                </form>
            </div>
        {/if}



        <!-- TAB 5: BAB CERITA CINTA (CHAPTERS) -->
        {#if activeTab === 'chapters'}
            <div transition:fade={{ duration: 200 }} class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <!-- Form Tambah Chapter Baru -->
                <div class="lg:col-span-1 bg-white border border-[#f4acb7]/30 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5 h-fit">
                    <h2 class="font-serif-title text-lg sm:text-xl font-bold text-[#4a3b32]">Tambah Bab Cerita Baru</h2>

                    <form method="POST" action="?/addChapter" use:enhance class="space-y-3.5">
                        <div>
                            <label for="num" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Bab (Contoh: Bab I)</label>
                            <input type="text" id="num" name="num" placeholder="Bab I" required class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="title" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Judul Bab</label>
                            <input type="text" id="title" name="title" placeholder="Pertemuan Pertama" required class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="subtitle" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Sub Judul</label>
                            <input type="text" id="subtitle" name="subtitle" placeholder="Awal Dari Semua Cerita" class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="icon" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Ikon Emoji</label>
                            <input type="text" id="icon" name="icon" value="🌱" class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="story" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Isi Cerita Bab</label>
                            <textarea id="story" name="story" rows="4" placeholder="Tuliskan kisah bab ini..." required class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"></textarea>
                        </div>

                        <div>
                            <label for="order_index" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">Urutan Bab</label>
                            <input type="number" id="order_index" name="order_index" value={data.chapters.length + 1} class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <button type="submit" class="w-full py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold rounded-xl shadow-md transition-all text-xs active:scale-95">
                            + Tambah Bab Cerita
                        </button>
                    </form>
                </div>

                <!-- Daftar Chapter Aktif -->
                <div class="lg:col-span-2 bg-white border border-[#f4acb7]/30 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
                    <h2 class="font-serif-title text-lg sm:text-xl font-bold text-[#4a3b32]">Daftar Bab Cerita Aktif</h2>

                    {#if data.chapters.length === 0}
                        <p class="text-xs text-gray-500 italic py-8 text-center">Belum ada bab cerita kustom di database (Sistem menampilkan 4 bab cerita default).</p>
                    {:else}
                        <div class="space-y-3.5">
                            {#each data.chapters as ch (ch.id)}
                                <div class="p-4 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl flex items-start justify-between gap-3 shadow-2xs">
                                    <div class="space-y-1">
                                        <span class="inline-block px-2.5 py-0.5 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-full text-[10px] font-bold text-[#f4acb7]">
                                            {ch.num} - {ch.icon} (Urutan: {ch.order_index})
                                        </span>
                                        <h3 class="font-serif-title font-bold text-sm sm:text-base text-[#4a3b32]">{ch.title}</h3>
                                        <p class="text-xs italic text-[#f4acb7]">{ch.subtitle}</p>
                                        <p class="text-xs text-[#4a3b32]/80 leading-relaxed">{ch.story}</p>
                                    </div>

                                    <form method="POST" action="?/deleteChapter" use:enhance>
                                        <input type="hidden" name="id" value={ch.id} />
                                        <button 
                                            type="submit" 
                                            onclick={(e) => !confirm('Hapus bab cerita ini?') && e.preventDefault()}
                                            class="px-2.5 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-xs font-semibold transition-colors active:scale-95"
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
            <div transition:fade={{ duration: 200 }} class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <!-- Form Tambah Timeline Baru -->
                <div class="lg:col-span-1 bg-white border border-[#f4acb7]/30 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5 h-fit">
                    <h2 class="font-serif-title text-lg sm:text-xl font-bold text-[#4a3b32]">Tambah Momen Cerita</h2>

                    <form method="POST" action="?/addTimeline" use:enhance class="space-y-3.5">
                        <div>
                            <label for="date_label" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">
                                Label Tanggal
                            </label>
                            <input 
                                type="text" 
                                id="date_label" 
                                name="date_label" 
                                placeholder="Contoh: 14 Februari 2021"
                                required
                                class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            />
                        </div>

                        <div>
                            <label for="title" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">
                                Judul Momen
                            </label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                placeholder="Contoh: Kencan Pertama"
                                required
                                class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            />
                        </div>

                        <div>
                            <label for="description" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">
                                Deskripsi Cerita
                            </label>
                            <textarea 
                                id="description" 
                                name="description" 
                                rows="3" 
                                placeholder="Tuliskan momen indah..."
                                required
                                class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            ></textarea>
                        </div>

                        <div>
                            <label for="order_index" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1">
                                Urutan Tampil
                            </label>
                            <input 
                                type="number" 
                                id="order_index" 
                                name="order_index" 
                                value={data.timeline.length + 1}
                                class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            />
                        </div>

                        <button
                            type="submit"
                            class="w-full py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold rounded-xl shadow-md transition-all text-xs active:scale-95"
                        >
                            + Tambah Ke Timeline
                        </button>
                    </form>
                </div>

                <!-- Lista Timeline Aktif -->
                <div class="lg:col-span-2 bg-white border border-[#f4acb7]/30 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
                    <h2 class="font-serif-title text-lg sm:text-xl font-bold text-[#4a3b32]">Daftar Timeline Aktif</h2>

                    {#if data.timeline.length === 0}
                        <p class="text-xs text-gray-500 italic py-8 text-center">Belum ada data timeline. Tambahkan momen cerita baru di form sebelah kiri.</p>
                    {:else}
                        <div class="space-y-3.5">
                            {#each data.timeline as item (item.id)}
                                <div class="p-4 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl flex items-start justify-between gap-3 shadow-2xs">
                                    <div class="space-y-1">
                                        <span class="inline-block px-2.5 py-0.5 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-full text-[10px] font-bold text-[#f4acb7]">
                                            {item.date_label} (Urutan: {item.order_index})
                                        </span>
                                        <h3 class="font-serif-title font-bold text-sm sm:text-base text-[#4a3b32]">{item.title}</h3>
                                        <p class="text-xs text-[#4a3b32]/80">{item.description}</p>
                                    </div>

                                    <form method="POST" action="?/deleteTimeline" use:enhance>
                                        <input type="hidden" name="id" value={item.id} />
                                        <button 
                                            type="submit" 
                                            onclick={(e) => !confirm('Yakin ingin menghapus momen ini?') && e.preventDefault()}
                                            class="px-2.5 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-xs font-semibold transition-colors active:scale-95"
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

        <!-- TAB 7: KARTU CERITA FOTO (MULTI-PHOTO SLIDER CARDS) -->
        {#if activeTab === 'gallery'}
            <div transition:fade={{ duration: 200 }} class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <!-- Form Tambah Kartu Cerita Foto Baru -->
                <div class="lg:col-span-1 bg-white border border-[#f4acb7]/30 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5 h-fit">
                    <h2 class="font-serif-title text-lg sm:text-xl font-bold text-[#4a3b32]">Buat Kartu Cerita Foto Baru</h2>

                    <form method="POST" action="?/uploadGallery" enctype="multipart/form-data" use:enhance class="space-y-4">
                        <div>
                            <label for="caption" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                                Judul Momen Cerita
                            </label>
                            <input 
                                type="text" 
                                id="caption" 
                                name="caption" 
                                placeholder="Contoh: Kencan Pertama di Kedai Kopi"
                                required
                                class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            />
                        </div>

                        <div>
                            <label for="story" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                                Penjelasan / Catatan Cerita
                            </label>
                            <textarea 
                                id="story" 
                                name="story" 
                                rows="3" 
                                placeholder="Tuliskan kisah di balik foto-foto ini..."
                                required
                                class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            ></textarea>
                        </div>

                        <div>
                            <label for="gallery_files" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                                Unggah Foto (Bisa Pilih Banyak Foto untuk Slide/Carousel)
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
                            <p class="text-[10px] text-[#4a3b32]/60 mt-1">💡 Anda dapat memilih beberapa foto sekaligus untuk membuat slide foto pada kartu ini.</p>
                        </div>

                        <div>
                            <label for="order_index" class="block text-xs font-bold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                                Urutan Tampil
                            </label>
                            <input 
                                type="number" 
                                id="order_index" 
                                name="order_index" 
                                value={data.gallery.length + 1}
                                class="w-full px-3.5 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            />
                        </div>

                        <button
                            type="submit"
                            class="w-full py-3.5 bg-gradient-to-r from-[#f4acb7] to-[#e89aa7] hover:brightness-105 text-white font-bold rounded-2xl shadow-md transition-all text-xs active:scale-95"
                        >
                            📸 + Buat Kartu Cerita Foto
                        </button>
                    </form>
                </div>

                <!-- Daftar Kartu Cerita Foto Aktif -->
                <div class="lg:col-span-2 bg-white border border-[#f4acb7]/30 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
                    <h2 class="font-serif-title text-lg sm:text-xl font-bold text-[#4a3b32]">Daftar Kartu Cerita Foto Aktif ({data.gallery.length})</h2>

                    {#if data.gallery.length === 0}
                        <p class="text-xs text-gray-500 italic py-8 text-center">Belum ada kartu cerita foto. Buat kartu cerita baru di form sebelah kiri.</p>
                    {:else}
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {#each data.gallery as card (card.id)}
                                <div class="bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl p-4 space-y-3 relative group shadow-2xs">
                                    <!-- Photo Thumbnail or Slider Indicator -->
                                    <div class="w-full h-44 rounded-xl overflow-hidden border border-[#f4acb7]/30 relative bg-black/5">
                                        <img src={card.image_url || (card.image_urls && card.image_urls[0])} alt={card.caption} class="w-full h-full object-cover" />
                                        {#if card.image_urls && card.image_urls.length > 1}
                                            <span class="absolute top-2 left-2 px-2.5 py-1 bg-black/70 text-white rounded-full text-[10px] font-bold shadow-md">
                                                🖼️ {card.image_urls.length} Foto Slide
                                            </span>
                                        {/if}
                                    </div>

                                    <div>
                                        <h3 class="font-serif-title font-bold text-base text-[#4a3b32]">{card.caption || 'Momen Spesial'}</h3>
                                        <p class="text-xs text-[#4a3b32]/80 italic line-clamp-2 mt-0.5">"{card.story || 'Catatan kenangan manis...'}"</p>
                                    </div>

                                    <form method="POST" action="?/deleteGallery" use:enhance class="pt-2 border-t border-[#f4acb7]/20 flex justify-between items-center">
                                        <input type="hidden" name="id" value={card.id} />
                                        <span class="text-[10px] text-[#4a3b32]/60">Urutan: {card.order_index}</span>
                                        <button 
                                            type="submit" 
                                            onclick={(e) => !confirm('Hapus kartu cerita foto ini?') && e.preventDefault()}
                                            class="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-xs font-semibold transition-colors active:scale-95"
                                        >
                                            Hapus Kartu
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
