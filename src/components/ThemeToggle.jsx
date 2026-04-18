"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="control w-9 h-9 ml-4 rounded-full border-outline/50 text-2xl"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <FiSun className="text-yellow-400 drop-shadow-[0_0_5px_rgba(253,224,71,0.5)]" size={16} /> : <FiMoon className="text-slate-800" size={16} />}
        </button>
    );
}
