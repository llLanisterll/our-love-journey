import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // 1. Fetch site config
    const { data: config } = await supabase
        .from('site_config')
        .select('*')
        .limit(1)
        .maybeSingle();

    // 2. Fetch timeline
    const { data: timeline } = await supabase
        .from('timeline')
        .select('*')
        .order('order_index', { ascending: true });

    // 3. Fetch gallery
    const { data: gallery } = await supabase
        .from('gallery')
        .select('*')
        .order('order_index', { ascending: true });

    // 4. Fetch chapters
    const { data: chapters } = await supabase
        .from('chapters')
        .select('*')
        .order('order_index', { ascending: true });

    return {
        config: config || {},
        timeline: timeline || [],
        gallery: gallery || [],
        chapters: chapters || []
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    // 1. Update nama pasangan, start date, quotes & tempat kenangan
    updateConfig: async ({ request }) => {
        const formData = await request.formData();
        const groom_name = String(formData.get('groom_name') || '');
        const bride_name = String(formData.get('bride_name') || '');
        const main_quote = String(formData.get('main_quote') || '');
        const start_date = String(formData.get('start_date') || '2021-02-14');

        // Dynamic Tempat Kenangan Spot 1 & Spot 2
        const spot1_title = String(formData.get('spot1_title') || 'Tempat Kencan Pertama');
        const spot1_name = String(formData.get('spot1_name') || 'Kedai Kopi Kenangan Indah');
        const spot1_address = String(formData.get('spot1_address') || 'Jl. Romantic No. 123, Kota Bandung');
        const spot1_desc = String(formData.get('spot1_desc') || 'Di mana kecanggungan berubah menjadi tawa dan perbincangan hangat.');
        const spot1_maps_url = String(formData.get('spot1_maps_url') || 'https://maps.google.com');

        const spot2_title = String(formData.get('spot2_title') || 'Lokasi Perayaan Spesial');
        const spot2_name = String(formData.get('spot2_name') || 'Taman Bunga & Resto Senja');
        const spot2_address = String(formData.get('spot2_address') || 'Jl. Panoramic No. 45, Kota Bandung');
        const spot2_desc = String(formData.get('spot2_desc') || 'Tempat impian tempat kami merayakan momen indah dan saling menatap masa depan.');
        const spot2_maps_url = String(formData.get('spot2_maps_url') || 'https://maps.google.com');

        const { error } = await supabase
            .from('site_config')
            .upsert({
                id: '00000000-0000-0000-0000-000000000001',
                groom_name,
                bride_name,
                main_quote,
                start_date,
                spot1_title,
                spot1_name,
                spot1_address,
                spot1_desc,
                spot1_maps_url,
                spot2_title,
                spot2_name,
                spot2_address,
                spot2_desc,
                spot2_maps_url,
                updated_at: new Date().toISOString()
            });

        if (error) {
            return fail(400, { error: 'Gagal memperbarui konfigurasi: ' + error.message });
        }

        return { success: 'Konfigurasi teks & tempat kenangan berhasil disimpan!' };
    },

    // 2. Upload Audio Background (.mp3)
    uploadAudio: async ({ request }) => {
        const formData = await request.formData();
        const audioFile = formData.get('audio_file');

        if (!audioFile || !(audioFile instanceof File) || audioFile.size === 0) {
            return fail(400, { error: 'Pilih file audio MP3 yang valid.' });
        }

        const fileName = `audio_${Date.now()}_${audioFile.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
        const filePath = `audio/${fileName}`;

        const { error: uploadErr } = await supabase.storage
            .from('media')
            .upload(filePath, audioFile, {
                cacheControl: '3600',
                upsert: true
            });

        if (uploadErr) {
            return fail(400, { error: 'Gagal mengunggah file audio: ' + uploadErr.message });
        }

        const { data: publicUrlData } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

        const bg_music_url = publicUrlData.publicUrl;

        const { error: dbErr } = await supabase
            .from('site_config')
            .upsert({
                id: '00000000-0000-0000-0000-000000000001',
                bg_music_url,
                updated_at: new Date().toISOString()
            });

        if (dbErr) {
            return fail(400, { error: 'Gagal menyimpan URL audio di database: ' + dbErr.message });
        }

        return { success: 'Audio background berhasil diunggah!' };
    },

    // 3. Upload Media Utama (Cover & Foto Profil)
    uploadMedia: async ({ request }) => {
        const formData = await request.formData();
        const coverFile = formData.get('cover_photo');
        const groomFile = formData.get('groom_photo');
        const brideFile = formData.get('bride_photo');

        /** @type {{ id: string, updated_at: string, cover_photo_url?: string, groom_photo_url?: string, bride_photo_url?: string }} */
        const updates = {
            id: '00000000-0000-0000-0000-000000000001',
            updated_at: new Date().toISOString()
        };

        /**
         * @param {FormDataEntryValue | null} file
         * @param {string} pathPrefix
         */
        async function uploadHelper(file, pathPrefix) {
            if (file && file instanceof File && file.size > 0) {
                const fileName = `${pathPrefix}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
                const filePath = `covers/${fileName}`;

                const { error: uploadErr } = await supabase.storage
                    .from('media')
                    .upload(filePath, file, { upsert: true });

                if (!uploadErr) {
                    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
                    return data.publicUrl;
                }
            }
            return null;
        }

        const coverUrl = await uploadHelper(coverFile, 'cover');
        const groomUrl = await uploadHelper(groomFile, 'groom');
        const brideUrl = await uploadHelper(brideFile, 'bride');

        if (coverUrl) updates.cover_photo_url = coverUrl;
        if (groomUrl) updates.groom_photo_url = groomUrl;
        if (brideUrl) updates.bride_photo_url = brideUrl;

        const { error } = await supabase.from('site_config').upsert(updates);

        if (error) {
            return fail(400, { error: 'Gagal memperbarui foto media: ' + error.message });
        }

        return { success: 'Foto media utama berhasil diperbarui!' };
    },

    // 4. Tambah Bab Cerita Baru (Chapters CRUD)
    addChapter: async ({ request }) => {
        const formData = await request.formData();
        const num = String(formData.get('num') || 'Bab I');
        const title = String(formData.get('title') || '');
        const subtitle = String(formData.get('subtitle') || '');
        const icon = String(formData.get('icon') || '🌱');
        const story = String(formData.get('story') || '');
        const order_index = Number(formData.get('order_index') || 0);

        if (!title || !story) {
            return fail(400, { error: 'Judul dan isi cerita bab wajib diisi.' });
        }

        const { error } = await supabase
            .from('chapters')
            .insert({ num, title, subtitle, icon, story, order_index });

        if (error) {
            return fail(400, { error: 'Gagal menambah bab cerita: ' + error.message });
        }

        return { success: 'Bab cerita berhasil ditambahkan!' };
    },

    // 5. Hapus Bab Cerita
    deleteChapter: async ({ request }) => {
        const formData = await request.formData();
        const id = String(formData.get('id') || '');

        if (!id) return fail(400, { error: 'ID bab cerita tidak valid.' });

        const { error } = await supabase.from('chapters').delete().eq('id', id);

        if (error) {
            return fail(400, { error: 'Gagal menghapus bab cerita: ' + error.message });
        }

        return { success: 'Bab cerita berhasil dihapus.' };
    },

    // 6. Tambah Timeline Baru
    addTimeline: async ({ request }) => {
        const formData = await request.formData();
        const date_label = String(formData.get('date_label') || '');
        const title = String(formData.get('title') || '');
        const description = String(formData.get('description') || '');
        const order_index = Number(formData.get('order_index') || 0);

        if (!date_label || !title || !description) {
            return fail(400, { error: 'Tanggal, judul, dan cerita wajib diisi.' });
        }

        const { error } = await supabase
            .from('timeline')
            .insert({ date_label, title, description, order_index });

        if (error) {
            return fail(400, { error: 'Gagal menambah timeline: ' + error.message });
        }

        return { success: 'Momen cerita berhasil ditambahkan ke timeline!' };
    },

    // 7. Hapus Timeline
    deleteTimeline: async ({ request }) => {
        const formData = await request.formData();
        const id = String(formData.get('id') || '');

        if (!id) return fail(400, { error: 'ID timeline tidak valid.' });

        const { error } = await supabase.from('timeline').delete().eq('id', id);

        if (error) {
            return fail(400, { error: 'Gagal menghapus timeline: ' + error.message });
        }

        return { success: 'Momen timeline berhasil dihapus.' };
    },

    // 8. Upload Galeri Foto Banyak (Multi-file)
    uploadGallery: async ({ request }) => {
        const formData = await request.formData();
        const files = formData.getAll('gallery_files');
        const caption = String(formData.get('caption') || '');

        if (!files || files.length === 0) {
            return fail(400, { error: 'Pilih minimal satu foto galeri.' });
        }

        const insertRows = [];

        for (const file of files) {
            if (file && file instanceof File && file.size > 0) {
                const fileName = `gallery_${Date.now()}_${Math.random().toString(36).substring(7)}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
                const filePath = `gallery/${fileName}`;

                const { error: uploadErr } = await supabase.storage
                    .from('media')
                    .upload(filePath, file, { upsert: true });

                if (!uploadErr) {
                    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
                    insertRows.push({
                        image_url: data.publicUrl,
                        caption: caption || file.name,
                        order_index: insertRows.length
                    });
                }
            }
        }

        if (insertRows.length > 0) {
            const { error: dbErr } = await supabase.from('gallery').insert(insertRows);
            if (dbErr) {
                return fail(400, { error: 'Gagal menyimpan data galeri: ' + dbErr.message });
            }
        }

        return { success: `${insertRows.length} foto berhasil ditambahkan ke galeri!` };
    },

    // 9. Hapus Foto Galeri
    deleteGallery: async ({ request }) => {
        const formData = await request.formData();
        const id = String(formData.get('id') || '');

        if (!id) return fail(400, { error: 'ID foto galeri tidak valid.' });

        const { error } = await supabase.from('gallery').delete().eq('id', id);

        if (error) {
            return fail(400, { error: 'Gagal menghapus foto galeri: ' + error.message });
        }

        return { success: 'Foto galeri berhasil dihapus.' };
    },

    // 10. Logout
    logout: async () => {
        await supabase.auth.signOut();
        throw redirect(303, '/admin/login');
    }
};
