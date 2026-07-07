import { useState, useEffect } from 'react';

export type ThemeId = 
  | 'catppuccin'
  | 'warm-paper';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  isDark: boolean;
}

export const themes: ThemeConfig[] = [
  { id: 'catppuccin', name: 'Catppuccin Mocha', isDark: true },
  { id: 'warm-paper', name: 'Warm Paper', isDark: false },
];

export function useTheme() {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('zed-portfolio-theme') as ThemeId;
    if (saved && ['catppuccin', 'warm-paper'].includes(saved)) {
      return saved;
    }
    return 'catppuccin';
  });

  useEffect(() => {
    // Apply class to body
    const body = document.body;
    themes.forEach((t) => {
      body.classList.remove(`theme-${t.id}`);
    });
    // Remove any leftover legacy themes
    const legacyThemes = [
      'tokyo-night', 'dracula', 'nord', 'rose-pine',
      'zed-dark', 'zed-light', 'one-dark', 'gruvbox-dark'
    ];
    legacyThemes.forEach((t) => body.classList.remove(`theme-${t}`));

    body.classList.add(`theme-${themeId}`);
    
    // Set storage
    localStorage.setItem('zed-portfolio-theme', themeId);
  }, [themeId]);

  const setThemeId = (id: ThemeId) => {
    setThemeIdState(id);
  };

  const currentTheme = themes.find((t) => t.id === themeId) || themes[0];

  return {
    themeId,
    setThemeId,
    currentTheme,
    themes,
  };
}
