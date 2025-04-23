import React, { useState, useEffect } from 'react';
export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('jsonLensTheme') === 'dark');
  useEffect(() => {
    document.documentElement.classList[dark ? 'add' : 'remove']('dark');
    localStorage.setItem('jsonLensTheme', dark ? 'dark' : 'light');
  }, [dark]);
  return <button onClick={() => setDark(d => !d)}>{dark ? 'Light Mode' : 'Dark Mode'}</button>;
}