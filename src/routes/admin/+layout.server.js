import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
    // Abaikan check di halaman login agar tidak terjadi infinite loop
    if (url.pathname === '/admin/login') {
        return {};
    }

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        throw redirect(303, '/admin/login');
    }

    return {
        user: session.user
    };
}
