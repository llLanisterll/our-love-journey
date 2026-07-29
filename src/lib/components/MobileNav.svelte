<script>
    import { onMount } from 'svelte';

    let activeSection = $state('hero-section');

    const navItems = [
        { id: 'hero-section', label: 'Beranda', icon: '🏠' },
        { id: 'chapters', label: 'Bab Cerita', icon: '📖' },
        { id: 'timeline', label: 'Timeline', icon: '⏳' },
        { id: 'gallery', label: 'Foto Cerita', icon: '📸' }
    ];

    /**
     * @param {string} id
     */
    function scrollTo(id) {
        const elem = document.getElementById(id);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
            activeSection = id;
        }
    }

    onMount(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPos = window.scrollY + 200;

            for (const sec of sections) {
                if (sec) {
                    const top = sec.offsetTop;
                    const height = sec.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        activeSection = sec.id;
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<!-- Mobile Floating Glassmorphism Bottom Nav Bar -->
<div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md md:hidden">
    <nav class="bg-white/80 backdrop-blur-md border border-[#f4acb7]/40 rounded-full px-3 py-2 shadow-lg flex items-center justify-around">
        {#each navItems as item}
            <button
                type="button"
                onclick={() => scrollTo(item.id)}
                class="flex flex-col items-center justify-center space-y-0.5 text-[10px] font-semibold transition-all duration-300 px-2 py-1 rounded-full {activeSection === item.id ? 'text-[#f4acb7] scale-110' : 'text-[#4a3b32]/70 hover:text-[#4a3b32]'}"
                aria-label={item.label}
            >
                <span class="text-base leading-none">{item.icon}</span>
                <span class="truncate max-w-[54px]">{item.label}</span>
            </button>
        {/each}
    </nav>
</div>
