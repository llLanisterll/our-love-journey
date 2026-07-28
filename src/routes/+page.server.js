import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    // 1. Ambil URL query parameter ?to= (contoh: "Bripda Rival")
    const guestName = url.searchParams.get('to') || 'Tamu Undangan';

    try {
        // 2. Fetch site config
        const { data: configData, error: configErr } = await supabase
            .from('site_config')
            .select('*')
            .limit(1)
            .maybeSingle();

        if (configErr) {
            console.warn('Supabase site_config fetch warning:', configErr.message);
        }

        // 3. Fetch timeline items
        const { data: timelineData, error: timelineErr } = await supabase
            .from('timeline')
            .select('*')
            .order('order_index', { ascending: true });

        if (timelineErr) {
            console.warn('Supabase timeline fetch warning:', timelineErr.message);
        }

        // 4. Fetch gallery items
        const { data: galleryData, error: galleryErr } = await supabase
            .from('gallery')
            .select('*')
            .order('order_index', { ascending: true });

        if (galleryErr) {
            console.warn('Supabase gallery fetch warning:', galleryErr.message);
        }

        return {
            guestName,
            config: configData || {
                groom_name: 'Bripda Rival',
                bride_name: 'Siti',
                main_quote: 'Setiap detik bersamamu adalah takdir terindah dalam hidupku.',
                cover_photo_url: '',
                groom_photo_url: '',
                bride_photo_url: '',
                bg_music_url: ''
            },
            timeline: timelineData || [],
            gallery: galleryData || []
        };
    } catch (err) {
        console.error('Error loading public page data:', err);
        return {
            guestName,
            config: {
                groom_name: 'Bripda Rival',
                bride_name: 'Siti',
                main_quote: 'Setiap detik bersamamu adalah takdir terindah dalam hidupku.'
            },
            timeline: [],
            gallery: []
        };
    }
}
