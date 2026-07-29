/**
 * Svelte Action: tilt3d
 * Memicu efek kemiringan 3D interaktif pada elemen berdasarkan pergerakan kursor/sentuhan.
 * 
 * @param {HTMLElement} node
 * @param {{ maxTilt?: number, perspective?: number, scale?: number }} [options]
 */
export function tilt3d(node, options = { maxTilt: 10, perspective: 1000, scale: 1.02 }) {
    let rect = node.getBoundingClientRect();

    function updateRect() {
        rect = node.getBoundingClientRect();
    }

    /**
     * @param {MouseEvent | TouchEvent} e
     */
    function handleMove(e) {
        updateRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -(options.maxTilt || 10);
        const rotateY = ((x - centerX) / centerX) * (options.maxTilt || 10);

        node.style.transform = `perspective(${options.perspective || 1000}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${options.scale || 1.02}, ${options.scale || 1.02}, ${options.scale || 1.02})`;
        node.style.transition = 'transform 0.1s ease-out';
    }

    function handleLeave() {
        node.style.transform = `perspective(${options.perspective || 1000}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        node.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseleave', handleLeave);

    return {
        destroy() {
            node.removeEventListener('mousemove', handleMove);
            node.removeEventListener('mouseleave', handleLeave);
        }
    };
}
