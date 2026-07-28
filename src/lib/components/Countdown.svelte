<script>
    import { onMount, onDestroy } from 'svelte';

    let { targetDate = '2026-11-29T09:00:00+07:00' } = $props();

    let days = $state(0);
    let hours = $state(0);
    let minutes = $state(0);
    let seconds = $state(0);

    /** @type {ReturnType<typeof setInterval> | null} */
    let timer = null;

    function updateCountdown() {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        if (difference > 0) {
            days = Math.floor(difference / (1000 * 60 * 60 * 24));
            hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((difference % (1000 * 60)) / 1000);
        } else {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
    }

    onMount(() => {
        updateCountdown();
        timer = setInterval(updateCountdown, 1000);
    });

    onDestroy(() => {
        if (timer) clearInterval(timer);
    });
</script>

<div class="space-y-3 my-6">
    <p class="text-xs uppercase tracking-widest text-[#f4acb7] font-semibold">Menuju Tanggal Spesial Momen Kebersamaan</p>

    <div class="grid grid-cols-4 gap-3 max-w-md mx-auto text-center">
        <div class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/40 rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow">
            <span class="font-serif-title text-2xl md:text-3xl font-bold text-[#4a3b32] block">{days}</span>
            <span class="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#f4acb7]">Hari</span>
        </div>
        <div class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/40 rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow">
            <span class="font-serif-title text-2xl md:text-3xl font-bold text-[#4a3b32] block">{hours}</span>
            <span class="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#f4acb7]">Jam</span>
        </div>
        <div class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/40 rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow">
            <span class="font-serif-title text-2xl md:text-3xl font-bold text-[#4a3b32] block">{minutes}</span>
            <span class="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#f4acb7]">Menit</span>
        </div>
        <div class="bg-white/80 backdrop-blur-sm border border-[#f4acb7]/40 rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow">
            <span class="font-serif-title text-2xl md:text-3xl font-bold text-[#4a3b32] block">{seconds}</span>
            <span class="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#f4acb7]">Detik</span>
        </div>
    </div>
</div>
