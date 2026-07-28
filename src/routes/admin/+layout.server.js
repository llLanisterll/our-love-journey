import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url, cookies }) {
    // Abaikan check di halaman login agar tidak terjadi infinite loop
    if (url.pathname === '/admin/login') {
        return {};
    }

    const accessToken = cookies.get('sb-access-token');

    if (!accessToken) {
        throw redirect(303, '/admin/login');
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
        cookies.delete('sb-access-token', { path: '/' });
        cookies.delete('sb-refresh-token', { path: '/' });
        throw redirect(303, '/admin/login');
    }

    return {
        user
    };
}

