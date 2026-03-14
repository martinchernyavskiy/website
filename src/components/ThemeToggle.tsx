import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = (savedTheme as 'light' | 'dark') || (systemPrefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
  <button
    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-300 hover:bg-sky-500/10 dark:hover:bg-sky-100/10 active:scale-90 focus:outline-none"
    aria-label="Toggle Theme"
  >
    <div className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125">
      {theme === 'light' ? (
        <Sun className="h-5 w-5 text-sky-600 transition-colors" />
      ) : (
        <Moon className="h-5 w-5 text-sky-400 transition-colors" />
      )}
    </div>
  </button>
  );
}