import { redirect, fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Cek jika sudah login
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        throw redirect(303, '/admin');
    }
    return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request }) => {
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

        throw redirect(303, '/admin');
    }
};
