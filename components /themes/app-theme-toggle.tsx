'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function AppThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    (() => setMounted(true))();
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
