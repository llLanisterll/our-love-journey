/**
 * Svelte Action: scrollReveal
 * Menyembunyikan elemen terlebih dahulu secara total (opacity: 0, 3D transform down),
 * dan baru memunculkannya secara halus & berani (*surprise 3D reveal*) saat elemen di-scroll ke area layar.
 * 
 * @param {HTMLElement} node
 * @param {{ delay?: number, distance?: number, duration?: number, once?: boolean, threshold?: number }} [options]
 */
export function scrollReveal(node, options = {}) {
    const delay = options.delay || 0;
    const distance = options.distance !== undefined ? options.distance : 65; // offset piksel
    const duration = options.duration || 850; // milidetik
    const once = options.once !== false; // default true (hanya muncul sekali saat di-scroll)
    const threshold = options.threshold || 0.08;

    // Sembunyikan elemen secara total saat pertama kali dirender
    node.style.opacity = '0';
    node.style.transform = `perspective(1000px) translateY(${distance}px) rotateX(16deg) scale(0.92)`;
    node.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
    node.style.willChange = 'transform, opacity';
    node.style.pointerEvents = 'none';

    function reveal() {
        node.style.opacity = '1';
        node.style.transform = 'perspective(1000px) translateY(0px) rotateX(0deg) scale(1)';
        node.style.pointerEvents = 'auto';
    }

    function hide() {
        node.style.opacity = '0';
        node.style.transform = `perspective(1000px) translateY(${distance}px) rotateX(16deg) scale(0.92)`;
        node.style.pointerEvents = 'none';
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        reveal();
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                reveal();
                if (once) {
                    observer.unobserve(node);
                }
            } else if (!once) {
                hide();
            }
        });
    }, {
        threshold: threshold,
        rootMargin: '0px 0px -40px 0px' // memicu ketika mendekati batas bawah layar
    });

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}
