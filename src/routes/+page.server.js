import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, setHeaders }) {
    const guestName = url.searchParams.get('to') || 'Sahabat Terkasih';

    // Set HTTP Cache Headers: Instant response on refresh from browser/CDN memory cache (0ms delay)
    setHeaders({
        'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
    });

    try {
        // Guaranteed fast fetch: Timeout fallback after 1200ms if Supabase connection lags
        const [configRes, timelineRes, galleryRes, chaptersRes] = await Promise.race([
            Promise.all([
                supabase.from('site_config').select('*').limit(1).maybeSingle(),
                supabase.from('timeline').select('*').order('order_index', { ascending: true }),
                supabase.from('gallery').select('*').order('order_index', { ascending: true }),
                supabase.from('chapters').select('*').order('order_index', { ascending: true })
            ]),
            new Promise((resolve) => 
                setTimeout(() => resolve([{ data: null }, { data: [] }, { data: [] }, { data: [] }]), 1200)
            )
        ]);

        return {
            guestName,
            config: configRes?.data || {
                groom_name: 'Bripda Rival',
                bride_name: 'Siti',
                main_quote: 'Setiap detik bersamamu adalah takdir terindah dalam hidupku.',
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
        console.warn('Fast fallback load triggered:', err);
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
