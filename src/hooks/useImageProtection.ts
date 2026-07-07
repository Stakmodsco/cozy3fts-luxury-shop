import { useEffect } from "react";

/**
 * Global image / content protection.
 * NOTE: Browsers cannot block OS-level screenshots (Snipping Tool, ⌘⇧4,
 * phone screenshots). This hook raises the friction for casual saving:
 *  - blocks right-click on all <img> elements
 *  - blocks drag-to-save
 *  - blocks Ctrl/⌘+S, Ctrl+U (view source), Ctrl+Shift+I/J/C, F12
 *  - clears the clipboard when PrintScreen is detected (best-effort)
 */
export function useImageProtection() {
  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (
        t.tagName === "IMG" ||
        t.closest(".protected-image") ||
        t.closest("[data-protected]")
      ) {
        e.preventDefault();
      }
    };

    const onDragStart = (e: DragEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "IMG" || t.closest(".protected-image"))) {
        e.preventDefault();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;

      // Save page, view source
      if (mod && (key === "s" || key === "u")) {
        e.preventDefault();
        return;
      }
      // DevTools shortcuts
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
      if (mod && e.shiftKey && ["i", "j", "c"].includes(key)) {
        e.preventDefault();
        return;
      }
      // PrintScreen — clear clipboard as a best-effort deterrent
      if (e.key === "PrintScreen") {
        try {
          navigator.clipboard?.writeText("");
        } catch {
          /* noop */
        }
      }
    };

    document.addEventListener("contextmenu", onContext);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}