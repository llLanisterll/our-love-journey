<script>
    import { enhance } from '$app/forms';

    let { data, form } = $props();

    let activeTab = $state('config'); // 'config' | 'spots' | 'chapters' | 'media' | 'audio' | 'timeline' | 'gallery'
</script>

<svelte:head>
    <title>Admin CMS - Perjalanan Cinta Pasangan</title>
</svelte:head>

<div class="min-h-screen bg-[#fdf8f5] text-[#3d2e28] font-body">

    <!-- Admin Topbar -->
    <header class="bg-white border-b border-[#f4acb7]/30 sticky top-0 z-30 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center space-x-3">
                <span class="w-10 h-10 rounded-full bg-[#f4acb7]/20 flex items-center justify-center text-[#f4acb7] font-bold">
                    💕
                </span>
                <div>
                    <h1 class="font-serif-title text-xl font-bold text-[#4a3b32]">Dashboard CMS Pasangan</h1>
                    <p class="text-xs text-[#4a3b32]/70">User: {data.user?.email || 'Admin'}</p>
                </div>
            </div>

            <div class="flex items-center space-x-3">
                <a 
                    href="/" 
                    target="_blank"
                    class="px-4 py-2 bg-[#fff0f3] hover:bg-[#ffe5ec] text-[#3d2e28] text-xs font-semibold rounded-xl border border-[#f4acb7]/40 transition-colors flex items-center space-x-1"
                >
                    <span>👁️ Pratinjau Website</span>
                </a>

                <form method="POST" action="?/logout">
                    <button 
                        type="submit"
                        class="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition-colors"
                    >
                        Keluar (Logout)
                    </button>
                </form>
            </div>
        </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-8 space-y-6">

        <!-- Notification Message -->
        {#if form?.error}
            <div class="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm flex items-center justify-between">
                <span>⚠️ {form.error}</span>
            </div>
        {/if}

        {#if form?.success}
            <div class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm flex items-center justify-between">
                <span>✨ {form.success}</span>
            </div>
        {/if}

        <!-- Navigation Tabs -->
        <div class="flex overflow-x-auto space-x-2 pb-2 border-b border-[#f4acb7]/30">
            <button 
                type="button"
                onclick={() => activeTab = 'config'}
                class="px-5 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap {activeTab === 'config' ? 'bg-[#f4acb7] text-white shadow-md' : 'bg-white text-[#4a3b32] hover:bg-[#fff0f3]'}"
            >
                📝 Nama & Tanggal
            </button>
            <button 
                type="button"
                onclick={() => activeTab = 'spots'}
                class="px-5 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap {activeTab === 'spots' ? 'bg-[#f4acb7] text-white shadow-md' : 'bg-white text-[#4a3b32] hover:bg-[#fff0f3]'}"
            >
                📍 Tempat Kenangan
            </button>
            <button 
                type="button"
                onclick={() => activeTab = 'chapters'}
                class="px-5 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap {activeTab === 'chapters' ? 'bg-[#f4acb7] text-white shadow-md' : 'bg-white text-[#4a3b32] hover:bg-[#fff0f3]'}"
            >
                📖 Bab Cerita ({data.chapters.length})
            </button>
            <button 
                type="button"
                onclick={() => activeTab = 'media'}
                class="px-5 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap {activeTab === 'media' ? 'bg-[#f4acb7] text-white shadow-md' : 'bg-white text-[#4a3b32] hover:bg-[#fff0f3]'}"
            >
                🖼️ Foto Utama & Cover
            </button>
            <button 
                type="button"
                onclick={() => activeTab = 'audio'}
                class="px-5 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap {activeTab === 'audio' ? 'bg-[#f4acb7] text-white shadow-md' : 'bg-white text-[#4a3b32] hover:bg-[#fff0f3]'}"
            >
                🎵 Musik Background
            </button>
            <button 
                type="button"
                onclick={() => activeTab = 'timeline'}
                class="px-5 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap {activeTab === 'timeline' ? 'bg-[#f4acb7] text-white shadow-md' : 'bg-white text-[#4a3b32] hover:bg-[#fff0f3]'}"
            >
                ⏳ Timeline Cerita ({data.timeline.length})
            </button>
            <button 
                type="button"
                onclick={() => activeTab = 'gallery'}
                class="px-5 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap {activeTab === 'gallery' ? 'bg-[#f4acb7] text-white shadow-md' : 'bg-white text-[#4a3b32] hover:bg-[#fff0f3]'}"
            >
                📸 Galeri Memories ({data.gallery.length})
            </button>
        </div>

        <!-- TAB 1: NAMA, TANGGAL & QUOTE -->
        {#if activeTab === 'config'}
            <div class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Pengaturan Nama Pasangan & Quote</h2>

                <form method="POST" action="?/updateConfig" use:enhance class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="groom_name" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-2">
                                Nama Pasangan (Pria)
                            </label>
                            <input 
                                type="text" 
                                id="groom_name" 
                                name="groom_name" 
                                value={data.config.groom_name || ''} 
                                required
                                class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f4acb7]"
                            />
                        </div>

                        <div>
                            <label for="bride_name" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-2">
                                Nama Pasangan (Wanita)
                            </label>
                            <input 
                                type="text" 
                                id="bride_name" 
                                name="bride_name" 
                                value={data.config.bride_name || ''} 
                                required
                                class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f4acb7]"
                            />
                        </div>
                    </div>

                    <div>
                        <label for="start_date" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-2">
                            Tanggal Mulai Hubungan / Kebersamaan (Untuk Hitung Hari Otomatis)
                        </label>
                        <input 
                            type="date" 
                            id="start_date" 
                            name="start_date" 
                            value={data.config.start_date || '2021-02-14'} 
                            required
                            class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f4acb7]"
                        />
                    </div>

                    <div>
                        <label for="main_quote" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-2">
                            Quote Utama / Kata Romantis
                        </label>
                        <textarea 
                            id="main_quote" 
                            name="main_quote" 
                            rows="4" 
                            required
                            class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f4acb7]"
                        >{data.config.main_quote || ''}</textarea>
                    </div>

                    <button
                        type="submit"
                        class="px-6 py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold rounded-xl shadow-md transition-all text-sm"
                    >
                        Simpan Perubahan Teks & Tanggal
                    </button>
                </form>
            </div>
        {/if}

        <!-- TAB 2: TEMPAT KENANGAN INDAH (SPOT 1 & 2) -->
        {#if activeTab === 'spots'}
            <div class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Pengaturan Tempat Kenangan Indah (Maps & Deskripsi)</h2>

                <form method="POST" action="?/updateConfig" use:enhance class="space-y-8">
                    <!-- Spot 1: Pertama Kali Bertemu / Kencan -->
                    <div class="p-6 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-2xl space-y-4">
                        <h3 class="font-serif-title text-lg font-bold text-[#4a3b32]">📍 Lokasi Spesial #1 (Misal: Kencan Pertama)</h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="spot1_title" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1">Judul Tempat</label>
                                <input type="text" id="spot1_title" name="spot1_title" value={data.config.spot1_title || 'Tempat Kencan Pertama'} class="w-full px-3 py-2 bg-white border border-[#f4acb7]/30 rounded-lg text-xs" />
                            </div>
                            <div>
                                <label for="spot1_name" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1">Nama Tempat / Cafe / Lokasi</label>
                                <input type="text" id="spot1_name" name="spot1_name" value={data.config.spot1_name || 'Kedai Kopi Kenangan Indah'} class="w-full px-3 py-2 bg-white border border-[#f4acb7]/30 rounded-lg text-xs" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="spot1_address" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1">Alamat Lengkap</label>
                                <input type="text" id="spot1_address" name="spot1_address" value={data.config.spot1_address || 'Jl. Romantic No. 123, Kota Bandung'} class="w-full px-3 py-2 bg-white border border-[#f4acb7]/30 rounded-lg text-xs" />
                            </div>
                            <div>
                                <label for="spot1_maps_url" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1">Tautan Google Maps URL</label>
                                <input type="url" id="spot1_maps_url" name="spot1_maps_url" value={data.config.spot1_maps_url || 'https://maps.google.com'} class="w-full px-3 py-2 bg-white border border-[#f4acb7]/30 rounded-lg text-xs" />
                            </div>
                        </div>

                        <div>
                            <label for="spot1_desc" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1">Catatan Kenangan</label>
                            <input type="text" id="spot1_desc" name="spot1_desc" value={data.config.spot1_desc || 'Di mana kecanggungan berubah menjadi tawa dan perbincangan hangat.'} class="w-full px-3 py-2 bg-white border border-[#f4acb7]/30 rounded-lg text-xs" />
                        </div>
                    </div>

                    <!-- Spot 2: Perayaan Spesial -->
                    <div class="p-6 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-2xl space-y-4">
                        <h3 class="font-serif-title text-lg font-bold text-[#4a3b32]">📍 Lokasi Spesial #2 (Misal: Tempat Anniversary)</h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="spot2_title" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1">Judul Tempat</label>
                                <input type="text" id="spot2_title" name="spot2_title" value={data.config.spot2_title || 'Lokasi Perayaan Spesial'} class="w-full px-3 py-2 bg-white border border-[#f4acb7]/30 rounded-lg text-xs" />
                            </div>
                            <div>
                                <label for="spot2_name" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1">Nama Tempat / Cafe / Lokasi</label>
                                <input type="text" id="spot2_name" name="spot2_name" value={data.config.spot2_name || 'Taman Bunga & Resto Senja'} class="w-full px-3 py-2 bg-white border border-[#f4acb7]/30 rounded-lg text-xs" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="spot2_address" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1">Alamat Lengkap</label>
                                <input type="text" id="spot2_address" name="spot2_address" value={data.config.spot2_address || 'Jl. Panoramic No. 45, Kota Bandung'} class="w-full px-3 py-2 bg-white border border-[#f4acb7]/30 rounded-lg text-xs" />
                            </div>
                            <div>
                                <label for="spot2_maps_url" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1">Tautan Google Maps URL</label>
                                <input type="url" id="spot2_maps_url" name="spot2_maps_url" value={data.config.spot2_maps_url || 'https://maps.google.com'} class="w-full px-3 py-2 bg-white border border-[#f4acb7]/30 rounded-lg text-xs" />
                            </div>
                        </div>

                        <div>
                            <label for="spot2_desc" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1">Catatan Kenangan</label>
                            <input type="text" id="spot2_desc" name="spot2_desc" value={data.config.spot2_desc || 'Tempat impian tempat kami merayakan momen indah.'} class="w-full px-3 py-2 bg-white border border-[#f4acb7]/30 rounded-lg text-xs" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="px-6 py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold rounded-xl shadow-md transition-all text-sm"
                    >
                        Simpan Semua Lokasi Kenangan
                    </button>
                </form>
            </div>
        {/if}

        <!-- TAB 3: BAB CERITA CINTA (CHAPTERS) -->
        {#if activeTab === 'chapters'}
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Form Tambah Chapter Baru -->
                <div class="lg:col-span-1 bg-white border border-[#f4acb7]/30 rounded-3xl p-6 shadow-sm space-y-6 h-fit">
                    <h2 class="font-serif-title text-xl font-bold text-[#4a3b32]">Tambah Bab Cerita Baru</h2>

                    <form method="POST" action="?/addChapter" use:enhance class="space-y-4">
                        <div>
                            <label for="num" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">Bab (Contoh: Bab I)</label>
                            <input type="text" id="num" name="num" placeholder="Bab I" required class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="title" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">Judul Bab</label>
                            <input type="text" id="title" name="title" placeholder="Pertemuan Pertama" required class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="subtitle" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">Sub Judul</label>
                            <input type="text" id="subtitle" name="subtitle" placeholder="Awal Dari Semua Cerita" class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="icon" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">Ikon Emoji</label>
                            <input type="text" id="icon" name="icon" value="🌱" class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <div>
                            <label for="story" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">Isi Cerita Bab</label>
                            <textarea id="story" name="story" rows="4" placeholder="Tuliskan kisah bab ini..." required class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"></textarea>
                        </div>

                        <div>
                            <label for="order_index" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">Urutan Bab</label>
                            <input type="number" id="order_index" name="order_index" value={data.chapters.length + 1} class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs" />
                        </div>

                        <button type="submit" class="w-full py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold rounded-xl shadow-md transition-all text-xs">
                            + Tambah Bab Cerita
                        </button>
                    </form>
                </div>

                <!-- Daftar Chapter Aktif -->
                <div class="lg:col-span-2 bg-white border border-[#f4acb7]/30 rounded-3xl p-6 shadow-sm space-y-6">
                    <h2 class="font-serif-title text-xl font-bold text-[#4a3b32]">Daftar Bab Cerita Aktif</h2>

                    {#if data.chapters.length === 0}
                        <p class="text-xs text-gray-500 italic py-8 text-center">Belum ada bab cerita kustom di database (Sistem menampilkan 4 bab cerita default).</p>
                    {:else}
                        <div class="space-y-4">
                            {#each data.chapters as ch (ch.id)}
                                <div class="p-4 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl flex items-start justify-between gap-4">
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

        <!-- TAB 4: FOTO UTAMA & COVER -->
        {#if activeTab === 'media'}
            <div class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Unggah Foto Cover & Profil Pasangan</h2>

                <form method="POST" action="?/uploadMedia" enctype="multipart/form-data" use:enhance class="space-y-8">
                    <!-- Cover Photo -->
                    <div class="space-y-3">
                        <label for="cover_photo" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32]">
                            Foto Cover Layar Pembuka (Full Screen)
                        </label>
                        {#if data.config.cover_photo_url}
                            <div class="w-full h-48 rounded-2xl overflow-hidden border border-[#f4acb7]/30 mb-2">
                                <img src={data.config.cover_photo_url} alt="Cover Preview" class="w-full h-full object-cover" />
                            </div>
                        {/if}
                        <input 
                            type="file" 
                            id="cover_photo" 
                            name="cover_photo" 
                            accept="image/*"
                            class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                        />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Groom Photo -->
                        <div class="space-y-3">
                            <label for="groom_photo" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32]">
                                Foto Pasangan Pria
                            </label>
                            {#if data.config.groom_photo_url}
                                <div class="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f4acb7] mb-2 mx-auto">
                                    <img src={data.config.groom_photo_url} alt="Groom Preview" class="w-full h-full object-cover" />
                                </div>
                            {/if}
                            <input 
                                type="file" 
                                id="groom_photo" 
                                name="groom_photo" 
                                accept="image/*"
                                class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            />
                        </div>

                        <!-- Bride Photo -->
                        <div class="space-y-3">
                            <label for="bride_photo" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32]">
                                Foto Pasangan Wanita
                            </label>
                            {#if data.config.bride_photo_url}
                                <div class="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f4acb7] mb-2 mx-auto">
                                    <img src={data.config.bride_photo_url} alt="Bride Preview" class="w-full h-full object-cover" />
                                </div>
                            {/if}
                            <input 
                                type="file" 
                                id="bride_photo" 
                                name="bride_photo" 
                                accept="image/*"
                                class="w-full px-4 py-2.5 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="px-6 py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold rounded-xl shadow-md transition-all text-sm"
                    >
                        Unggah & Update Foto Utama
                    </button>
                </form>
            </div>
        {/if}

        <!-- TAB 5: MUSIK BACKGROUND (.MP3) -->
        {#if activeTab === 'audio'}
            <div class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Manajemen Lagu Latar Belakang (Audio MP3)</h2>

                {#if data.config.bg_music_url}
                    <div class="p-4 bg-[#fff0f3] border border-[#f4acb7]/40 rounded-2xl space-y-3">
                        <p class="text-xs font-semibold text-[#4a3b32] uppercase tracking-wider">Audio Aktif Saat Ini:</p>
                        <audio controls src={data.config.bg_music_url} class="w-full"></audio>
                        <p class="text-xs text-[#4a3b32]/70 break-all">URL: {data.config.bg_music_url}</p>
                    </div>
                {/if}

                <form method="POST" action="?/uploadAudio" enctype="multipart/form-data" use:enhance class="space-y-4">
                    <div>
                        <label for="audio_file" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-2">
                            Pilih File Audio Baru (.mp3)
                        </label>
                        <input 
                            type="file" 
                            id="audio_file" 
                            name="audio_file" 
                            accept="audio/mp3,audio/mpeg"
                            required
                            class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                        />
                    </div>

                    <button
                        type="submit"
                        class="px-6 py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold rounded-xl shadow-md transition-all text-sm"
                    >
                        Unggah File MP3 Ke Storage
                    </button>
                </form>
            </div>
        {/if}

        <!-- TAB 6: TIMELINE CERITA -->
        {#if activeTab === 'timeline'}
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Form Tambah Timeline Baru -->
                <div class="lg:col-span-1 bg-white border border-[#f4acb7]/30 rounded-3xl p-6 shadow-sm space-y-6 h-fit">
                    <h2 class="font-serif-title text-xl font-bold text-[#4a3b32]">Tambah Momen Cerita</h2>

                    <form method="POST" action="?/addTimeline" use:enhance class="space-y-4">
                        <div>
                            <label for="date_label" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">
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
                            <label for="title" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">
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
                            <label for="description" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">
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
                            <label for="order_index" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">
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
                <div class="lg:col-span-2 bg-white border border-[#f4acb7]/30 rounded-3xl p-6 shadow-sm space-y-6">
                    <h2 class="font-serif-title text-xl font-bold text-[#4a3b32]">Daftar Timeline Aktif</h2>

                    {#if data.timeline.length === 0}
                        <p class="text-xs text-gray-500 italic py-8 text-center">Belum ada data timeline. Tambahkan momen cerita baru di form sebelah kiri.</p>
                    {:else}
                        <div class="space-y-4">
                            {#each data.timeline as item (item.id)}
                                <div class="p-4 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-2xl flex items-start justify-between gap-4">
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
            <div class="space-y-8">
                <!-- Form Multi Upload -->
                <div class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                    <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Unggah Foto Galeri (Bisa Banyak Foto)</h2>

                    <form method="POST" action="?/uploadGallery" enctype="multipart/form-data" use:enhance class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="gallery_files" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-2">
                                    Pilih File Foto (Bisa Banyak)
                                </label>
                                <input 
                                    type="file" 
                                    id="gallery_files" 
                                    name="gallery_files" 
                                    accept="image/*"
                                    multiple
                                    required
                                    class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                                />
                            </div>

                            <div>
                                <label for="caption" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-2">
                                    Caption Opsional
                                </label>
                                <input 
                                    type="text" 
                                    id="caption" 
                                    name="caption" 
                                    placeholder="Contoh: Liburan Bersama"
                                    class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-xs"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="px-6 py-3 bg-[#f4acb7] hover:bg-[#e89aa7] text-white font-bold rounded-xl shadow-md transition-all text-sm"
                        >
                            Unggah Foto Ke Galeri
                        </button>
                    </form>
                </div>

                <!-- Grid Galeri Aktif -->
                <div class="bg-white border border-[#f4acb7]/30 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                    <h2 class="font-serif-title text-2xl font-bold text-[#4a3b32]">Daftar Foto Galeri Aktif</h2>

                    {#if data.gallery.length === 0}
                        <p class="text-xs text-gray-500 italic py-8 text-center">Belum ada foto di galeri. Unggah foto baru menggunakan form di atas.</p>
                    {:else}
                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {#each data.gallery as photo (photo.id)}
                                <div class="relative group rounded-2xl overflow-hidden border border-[#f4acb7]/30 shadow-xs bg-[#fdf8f5]">
                                    <img src={photo.image_url} alt={photo.caption} class="w-full h-40 object-cover" />
                                    <div class="p-2 text-center">
                                        <p class="text-[11px] truncate font-medium text-[#4a3b32]">{photo.caption || 'Foto'}</p>
                                    </div>
                                    <form method="POST" action="?/deleteGallery" use:enhance class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <input type="hidden" name="id" value={photo.id} />
                                        <button 
                                            type="submit" 
                                            onclick={(e) => !confirm('Hapus foto ini dari galeri?') && e.preventDefault()}
                                            class="w-8 h-8 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center text-xs shadow-md"
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

    </div>
</div>
