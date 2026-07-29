/**
 * Svelte Action: viewport
 * Memicu callback `onEnter` dan `onExit` saat elemen masuk/keluar dari viewport.
 * 
 * @param {HTMLElement} node 
 * @param {{ threshold?: number, once?: boolean, rootMargin?: string, root?: Element | null, onEnter?: () => void, onExit?: () => void, animationClass?: string } | (() => void)} [param]
 */
export function viewport(node, param) {
    /** @type {IntersectionObserver | null} */
    let observer = null;

    let options = typeof param === 'function' 
        ? { onEnter: param, threshold: 0.05, once: true } 
        : { threshold: 0.05, once: true, ...param };

    /**
     * @param {IntersectionObserverEntry[]} entries
     */
    function handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (typeof options.onEnter === 'function') {
                    options.onEnter();
                }
                node.dispatchEvent(new CustomEvent('enterViewport'));
                node.dispatchEvent(new CustomEvent('enterviewport'));
                if (options.animationClass) {
                    node.classList.add(...options.animationClass.split(' '));
                }
                if (options.once && observer) {
                    observer.unobserve(node);
                }
            } else {
                if (typeof options.onExit === 'function') {
                    options.onExit();
                }
                node.dispatchEvent(new CustomEvent('exitViewport'));
                node.dispatchEvent(new CustomEvent('exitviewport'));
                if (!options.once && options.animationClass) {
                    node.classList.remove(...options.animationClass.split(' '));
                }
            }
        });
    }

    function initObserver() {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            if (typeof options.onEnter === 'function') {
                options.onEnter();
            }
            node.dispatchEvent(new CustomEvent('enterViewport'));
            node.dispatchEvent(new CustomEvent('enterviewport'));
            if (options.animationClass) {
                node.classList.add(...options.animationClass.split(' '));
            }
            return;
        }

        observer = new IntersectionObserver(handleIntersect, {
            root: options.root || null,
            rootMargin: options.rootMargin || '0px',
            threshold: options.threshold ?? 0.05
        });

        observer.observe(node);
    }

    initObserver();

    return {
        /**
         * @param {{ threshold?: number, once?: boolean, rootMargin?: string, root?: Element | null, onEnter?: () => void, onExit?: () => void, animationClass?: string } | (() => void)} newParam
         */
        update(newParam) {
            options = typeof newParam === 'function' 
                ? { onEnter: newParam, threshold: 0.05, once: true } 
                : { threshold: 0.05, once: true, ...newParam };
        },
        destroy() {
            if (observer) {
                observer.disconnect();
            }
        }
    };
}
