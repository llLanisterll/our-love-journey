import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, setHeaders }) {
    const guestName = url.searchParams.get('to') || 'Sahabat Terkasih';

    // Disable CDN caching so updates from Admin CMS reflect instantly on refresh
    setHeaders({
        'cache-control': 'no-cache, no-store, must-revalidate',
        'pragma': 'no-cache',
        'expires': '0'
    });

    try {
        const [configRes, timelineRes, galleryRes, chaptersRes] = await Promise.all([
            supabase.from('site_config').select('*').order('updated_at', { ascending: false }).limit(1).maybeSingle(),
            supabase.from('timeline').select('*').order('order_index', { ascending: true }),
            supabase.from('gallery').select('*').order('order_index', { ascending: true }),
            supabase.from('chapters').select('*').order('order_index', { ascending: true })
        ]);

        return {
            guestName,
            config: configRes?.data || {
                groom_name: '',
                bride_name: '',
                main_quote: '',
                start_date: '2021-02-14',
                cover_photo_url: '',
                groom_photo_url: '',
                bride_photo_url: '',
                bg_music_url: ''
            },
            timeline: timelineRes?.data || [],
            gallery: galleryRes?.data || [],
            chapters: chaptersRes?.data || []
        };
    } catch (err) {
        console.error('Error loading public page data from Supabase:', err);
        return {
            guestName,
            config: {
                groom_name: '',
                bride_name: '',
                main_quote: '',
                start_date: '2021-02-14'
            },
            timeline: [],
            gallery: [],
            chapters: []
        };
    }
}

