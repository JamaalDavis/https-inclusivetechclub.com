import { useEffect, RefObject } from 'react';

/**
 * Custom hook to trap keyboard focus within a container element,
 * support Escape-key dismissal, and restore focus to the previously active element on close.
 */
export default function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onClose?: () => void
) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    
    // Find all focusable elements within the container
    const focusableSelector =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    
    // Wait briefly for content to mount/animate to ensure elements are queryable
    const focusTimer = setTimeout(() => {
      const focusableElements = container.querySelectorAll(focusableSelector);
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      } else {
        container.focus();
      }
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
        event.preventDefault();
        return;
      }

      if (event.key === 'Tab') {
        const els = container.querySelectorAll(focusableSelector);
        if (els.length === 0) {
          event.preventDefault();
          return;
        }

        const firstEl = els[0] as HTMLElement;
        const lastEl = els[els.length - 1] as HTMLElement;

        if (event.shiftKey) {
          // Shift + Tab: if on the first focusable element, loop to the last
          if (document.activeElement === firstEl) {
            lastEl.focus();
            event.preventDefault();
          }
        } else {
          // Tab: if on the last focusable element, loop to the first
          if (document.activeElement === lastEl) {
            firstEl.focus();
            event.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Track active element before opening so we can restore it on close
    const previousActiveElement = document.activeElement as HTMLElement;

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        // Restore focus to the trigger element
        setTimeout(() => {
          previousActiveElement.focus();
        }, 50);
      }
    };
  }, [active, containerRef, onClose]);
}
