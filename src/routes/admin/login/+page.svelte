<script>
    import { enhance } from '$app/forms';

    let { form } = $props();
    let isLoading = $state(false);
</script>

<svelte:head>
    <title>Login Admin CMS - Perjalanan Cinta Pasangan</title>
</svelte:head>

<div class="min-h-screen bg-[#fdf8f5] flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white border border-[#f4acb7]/40 rounded-3xl p-8 shadow-xl space-y-6">
        <div class="text-center space-y-2">
            <span class="font-script text-3xl text-[#f4acb7]">Dashboard CMS</span>
            <h1 class="font-serif-title text-3xl font-bold text-[#4a3b32]">Login Admin</h1>
            <p class="text-xs text-[#4a3b32]/70">Masuk untuk mengelola konten dan media undangan</p>
        </div>

        {#if form?.error}
            <div class="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs text-center font-medium">
                {form.error}
            </div>
        {/if}

        <form 
            method="POST" 
            action="?/login" 
            use:enhance={() => {
                isLoading = true;
                return async ({ update }) => {
                    isLoading = false;
                    await update();
                };
            }} 
            class="space-y-4"
        >
            <div>
                <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                    Email Admin
                </label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="admin@example.com"
                    class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f4acb7] transition-all"
                />
            </div>

            <div>
                <label for="password" class="block text-xs font-semibold uppercase tracking-wider text-[#4a3b32] mb-1.5">
                    Password
                </label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    placeholder="••••••••"
                    class="w-full px-4 py-3 bg-[#fdf8f5] border border-[#f4acb7]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f4acb7] transition-all"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                class="w-full py-3.5 bg-gradient-to-r from-[#f4acb7] to-[#d8e2dc] hover:from-[#e89aa7] hover:to-[#c6d4cc] text-[#3d2e28] font-bold rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
            >
                {#if isLoading}
                    <span>Memproses...</span>
                {:else}
                    <span>Masuk ke Dashboard</span>
                {/if}
            </button>
        </form>

        <div class="text-center pt-2">
            <a href="/" class="text-xs text-[#f4acb7] hover:underline font-medium">
                &larr; Kembali ke Halaman Utama
            </a>
        </div>
    </div>
</div>
