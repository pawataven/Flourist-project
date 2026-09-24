let lockCount = 0;
let lockedScrollY = 0;
let savedBodyStyle: string | null = null;

/**
 * Locks page scroll and preserves scroll position.
 * Supports multiple concurrent locks (e.g. mobile menu and modal).
 */
export const lockScroll = (): void => {
    if (lockCount === 0) {
        lockedScrollY = window.scrollY;
        savedBodyStyle = document.body.getAttribute("style");
        Object.assign(document.body.style, {
            position: "fixed",
            top: `-${lockedScrollY}px`,
            width: "100%",
            overflow: "hidden",
        });
    }
    lockCount++;
};

/**
 * Releases a scroll lock. When all locks are released,
 * restores the original body style and scroll position.
 */
export const unlockScroll = (): void => {
    if (lockCount <= 0) return;
    lockCount--;
    if (lockCount === 0) {
        if (savedBodyStyle === null) {
            document.body.removeAttribute("style");
        } else {
            document.body.setAttribute("style", savedBodyStyle);
        }
        window.scrollTo(0, lockedScrollY);
    }
};

/**
 * Force-releases all scroll locks and restores body style.
 */
export const forceUnlockScroll = (): void => {
    lockCount = 0;
    if (savedBodyStyle === null) {
        document.body.removeAttribute("style");
    } else {
        document.body.setAttribute("style", savedBodyStyle);
    }
    window.scrollTo(0, lockedScrollY);
};

export const isScrollLocked = (): boolean => lockCount > 0;
export const getLockedScrollY = (): number => lockedScrollY;
