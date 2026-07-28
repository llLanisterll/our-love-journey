import { redirect, fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    // Cek jika sudah ada cookie session valid
    const accessToken = cookies.get('sb-access-token');
    if (accessToken) {
        const { data: { user } } = await supabase.auth.getUser(accessToken);
        if (user) {
            throw redirect(303, '/admin');
        }
    }
    return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            return fail(400, { error: 'Email dan password wajib diisi.' });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: String(email),
            password: String(password)
        });

        if (error) {
            return fail(400, { error: error.message || 'Login gagal. Periksa kembali email dan password.' });
        }

        if (data?.session) {
            cookies.set('sb-access-token', data.session.access_token, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: import.meta.env.PROD,
                maxAge: 60 * 60 * 24 * 7 // 1 minggu
            });
            cookies.set('sb-refresh-token', data.session.refresh_token, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: import.meta.env.PROD,
                maxAge: 60 * 60 * 24 * 7
            });
        }

        throw redirect(303, '/admin');
    }
};

