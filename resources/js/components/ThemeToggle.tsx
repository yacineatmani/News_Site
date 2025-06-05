import React from 'react';
import { useAppearance } from '@/hooks/use-appearance';

export default function ThemeToggle() {
  const { appearance, updateAppearance } = useAppearance();

  function handleClick() {
    updateAppearance(appearance === 'dark' ? 'light' : 'dark');
  }

  return (
    <button onClick={handleClick} style={{margin: 8, padding: 8}}>
      {appearance === 'dark' ? '🌙 Sombre' : '🌞 Clair'}
    </button>
  );
}