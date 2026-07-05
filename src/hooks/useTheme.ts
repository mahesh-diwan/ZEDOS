import { useState, useEffect } from 'react';

export type ThemeId = 
  | 'zed-dark' 
  | 'zed-light' 
  | 'one-dark' 
  | 'gruvbox-dark' 
  | 'tokyo-night'
  | 'catppuccin'
  | 'dracula'
  | 'nord'
  | 'rose-pine';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  isDark: boolean;
}

export const themes: ThemeConfig[] = [
  { id: 'tokyo-night', name: 'Tokyo Night', isDark: true },
  { id: 'catppuccin', name: 'Catppuccin Macchiato', isDark: true },
  { id: 'dracula', name: 'Dracula', isDark: true },
  { id: 'nord', name: 'Nord Frost', isDark: true },
  { id: 'rose-pine', name: 'Rosé Pine', isDark: true },
  { id: 'zed-dark', name: 'Zed Dark', isDark: true },
  { id: 'zed-light', name: 'Zed Light', isDark: false },
  { id: 'one-dark', name: 'One Dark', isDark: true },
  { id: 'gruvbox-dark', name: 'Gruvbox Dark', isDark: true },
];

export function useTheme() {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('zed-portfolio-theme') as ThemeId;
    if (saved && [
      'zed-dark', 'zed-light', 'one-dark', 'gruvbox-dark', 'tokyo-night',
      'catppuccin', 'dracula', 'nord', 'rose-pine'
    ].includes(saved)) {
      return saved;
    }
    return 'tokyo-night';
  });

  useEffect(() => {
    // Apply class to body
    const body = document.body;
    themes.forEach((t) => {
      body.classList.remove(`theme-${t.id}`);
    });
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
