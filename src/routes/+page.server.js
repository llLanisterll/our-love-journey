import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const guestName = url.searchParams.get('to') || 'Sahabat Terkasih';

    try {
        // Fetch ALL 4 Supabase queries in parallel using Promise.all (Super Fast Load!)
        const [configRes, timelineRes, galleryRes, chaptersRes] = await Promise.all([
            supabase.from('site_config').select('*').limit(1).maybeSingle(),
            supabase.from('timeline').select('*').order('order_index', { ascending: true }),
            supabase.from('gallery').select('*').order('order_index', { ascending: true }),
            supabase.from('chapters').select('*').order('order_index', { ascending: true })
        ]);

        return {
            guestName,
            config: configRes.data || {
                groom_name: 'Bripda Rival',
                bride_name: 'Siti',
                main_quote: 'Setiap detik bersamamu adalah takdir terindah dalam hidupku.',
                start_date: '2021-02-14',
                cover_photo_url: '',
                groom_photo_url: '',
                bride_photo_url: '',
                bg_music_url: ''
            },
            timeline: timelineRes.data || [],
            gallery: galleryRes.data || [],
            chapters: chaptersRes.data || []
        };
    } catch (err) {
        console.error('Error loading public page data in parallel:', err);
        return {
            guestName,
            config: {
                groom_name: 'Bripda Rival',
                bride_name: 'Siti',
                main_quote: 'Setiap detik bersamamu adalah takdir terindah dalam hidupku.',
                start_date: '2021-02-14'
            },
            timeline: [],
            gallery: [],
            chapters: []
        };
    }
}
