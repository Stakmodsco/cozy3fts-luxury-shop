import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Init from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
    }
  }, []);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:text-muted-foreground transition-all hover:scale-110 active:scale-90 duration-200"
      aria-label="Toggle dark mode"
      style={{
        background: dark
          ? "linear-gradient(145deg, hsl(var(--muted)), hsl(var(--background)))"
          : "linear-gradient(145deg, hsl(var(--background)), hsl(var(--muted)))",
        boxShadow: dark
          ? "3px 3px 6px hsl(var(--foreground) / 0.3), -2px -2px 5px hsl(var(--muted) / 0.1)"
          : "3px 3px 6px hsl(var(--border)), -2px -2px 5px hsl(var(--background))",
      }}
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
