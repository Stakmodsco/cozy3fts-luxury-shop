import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

/**
 * Fires a dense diagonal watermark overlay across the whole viewport when a
 * likely screenshot attempt is detected:
 *   - PrintScreen key (Windows / most keyboards)
 *   - window blur (Snipping Tool / macOS screenshot HUD steals focus)
 *   - tab visibilitychange (some capture tools trigger this)
 *
 * The overlay stays visible for ~1.5s so any capture taken during that window
 * is stamped edge-to-edge with the CoZy 3Fts logo.
 */
export default function ScreenshotShield() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const trigger = () => {
      setActive(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setActive(false), 1500);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || (e.metaKey && e.shiftKey)) trigger();
    };
    const onBlur = () => trigger();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") trigger();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-150 ${
        active ? "opacity-70" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url("${logo}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
        transform: "rotate(-22deg) scale(1.6)",
        transformOrigin: "center",
        mixBlendMode: "multiply",
      }}
    />
  );
}