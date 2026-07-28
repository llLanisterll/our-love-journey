<script>
    import { viewport } from '$lib/actions/viewport.js';
    import { fade, fly } from 'svelte/transition';

    let isVisible = $state(false);
    let copiedAccount = $state('');

    /**
     * @param {string} accountNumber
     */
    function copyToClipboard(accountNumber) {
        navigator.clipboard.writeText(accountNumber).then(() => {
            copiedAccount = accountNumber;
            setTimeout(() => {
                copiedAccount = '';
            }, 3000);
        });
    }
</script>

<section 
    id="gift-rsvp"
    use:viewport={{ threshold: 0.15 }}
    onenterViewport={() => isVisible = true}
    class="py-20 px-4 max-w-4xl mx-auto text-center"
>
    <!-- Section Title -->
    <div class="space-y-3 mb-16">
        <span class="font-script text-3xl md:text-4xl text-[#f4acb7]">Tanda Kasih</span>
        <h2 class="font-serif-title text-3xl md:text-5xl font-bold text-[#4a3b32] tracking-wide">
            Kirim Doa Restu & Kado Spesial
        </h2>
        <div class="w-16 h-0.5 bg-[#f4acb7] mx-auto rounded-full mt-2"></div>
    </div>

    {#if isVisible}
        <div in:fade={{ duration: 800 }} class="space-y-12">
            <!-- Digital Gift Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Bank BCA Card -->
                <div 
                    in:fly={{ y: 20, duration: 700, delay: 100 }}
                    class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/30 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 text-center"
                >
                    <div class="inline-block px-3 py-1 bg-[#fff0f3] text-[#f4acb7] font-bold text-xs rounded-full">
                        BANK BCA
                    </div>
                    <p class="font-serif-title text-2xl font-bold text-[#4a3b32] tracking-wider">1234 5678 90</p>
                    <p class="text-xs text-[#4a3b32]/70 font-medium">a.n. Bripda Rival</p>
                    <button
                        type="button"
                        onclick={() => copyToClipboard('1234567890')}
                        class="w-full py-2.5 bg-[#fdf8f5] hover:bg-[#fff0f3] border border-[#f4acb7]/40 text-[#3d2e28] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1"
                    >
                        <span>{copiedAccount === '1234567890' ? '✓ Nomor Rekening Tersalin!' : '📋 Salin Nomor Rekening'}</span>
                    </button>
                </div>

                <!-- Bank Mandiri Card -->
                <div 
                    in:fly={{ y: 20, duration: 700, delay: 250 }}
                    class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/30 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 text-center"
                >
                    <div class="inline-block px-3 py-1 bg-[#fff0f3] text-[#f4acb7] font-bold text-xs rounded-full">
                        BANK MANDIRI
                    </div>
                    <p class="font-serif-title text-2xl font-bold text-[#4a3b32] tracking-wider">9876 5432 10</p>
                    <p class="text-xs text-[#4a3b32]/70 font-medium">a.n. Siti</p>
                    <button
                        type="button"
                        onclick={() => copyToClipboard('9876543210')}
                        class="w-full py-2.5 bg-[#fdf8f5] hover:bg-[#fff0f3] border border-[#f4acb7]/40 text-[#3d2e28] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1"
                    >
                        <span>{copiedAccount === '9876543210' ? '✓ Nomor Rekening Tersalin!' : '📋 Salin Nomor Rekening'}</span>
                    </button>
                </div>
            </div>
        </div>
    {/if}
</section>
