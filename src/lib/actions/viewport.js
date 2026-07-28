/**
 * Svelte Action: viewport
 * Memicu event 'enterViewport' dan 'exitViewport' saat elemen masuk/keluar dari viewport.
 * Juga secara otomatis menambahkan kelas CSS animasi jika diberikan `animationClass`.
 * 
 * @param {HTMLElement} node 
 * @param {{ threshold?: number, once?: boolean, rootMargin?: string, root?: Element | null, animationClass?: string }} [options]
 */
export function viewport(node, options = { threshold: 0.15, once: true, rootMargin: '0px' }) {
    /** @type {IntersectionObserver | null} */
    let observer = null;

    /**
     * @param {IntersectionObserverEntry[]} entries
     */
    function handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                node.dispatchEvent(new CustomEvent('enterViewport'));
                if (options.animationClass) {
                    node.classList.add(...options.animationClass.split(' '));
                }
                if (options.once && observer) {
                    observer.unobserve(node);
                }
            } else {
                node.dispatchEvent(new CustomEvent('exitViewport'));
                if (!options.once && options.animationClass) {
                    node.classList.remove(...options.animationClass.split(' '));
                }
            }
        });
    }

    function initObserver() {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            node.dispatchEvent(new CustomEvent('enterViewport'));
            if (options.animationClass) {
                node.classList.add(...options.animationClass.split(' '));
            }
            return;
        }

        observer = new IntersectionObserver(handleIntersect, {
            root: options.root || null,
            rootMargin: options.rootMargin || '0px',
            threshold: options.threshold ?? 0.15
        });

        observer.observe(node);
    }

    initObserver();

    return {
        /**
         * @param {{ threshold?: number, once?: boolean, rootMargin?: string, root?: Element | null, animationClass?: string }} newOptions
         */
        update(newOptions) {
            options = { ...options, ...newOptions };
        },
        destroy() {
            if (observer) {
                observer.disconnect();
            }
        }
    };
}
