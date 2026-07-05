import { useState, useEffect } from 'react';

export type FontId = 'plus-geist' | 'space-jetbrains' | 'outfit-fira' | 'bricolage-azeret';

export interface FontConfig {
  id: FontId;
  name: string;
}

export const fonts: FontConfig[] = [
  { id: 'space-jetbrains', name: 'Space Grotesk + JetBrains Mono' },
  { id: 'plus-geist', name: 'Plus Jakarta Sans + Geist Mono' },
  { id: 'outfit-fira', name: 'Outfit + Fira Code' },
  { id: 'bricolage-azeret', name: 'Bricolage Grotesque + Azeret Mono' },
];

export function useFont() {
  const [fontId, setFontIdState] = useState<FontId>(() => {
    const saved = localStorage.getItem('zed-portfolio-font') as FontId;
    if (saved && ['plus-geist', 'space-jetbrains', 'outfit-fira', 'bricolage-azeret'].includes(saved)) {
      return saved;
    }
    return 'space-jetbrains'; // Let's set the default to the modern Space Grotesk + JetBrains Mono pair!
  });

  useEffect(() => {
    const body = document.body;
    fonts.forEach((f) => {
      body.classList.remove(`font-${f.id}`);
    });
    body.classList.add(`font-${fontId}`);
    
    localStorage.setItem('zed-portfolio-font', fontId);
  }, [fontId]);

  const setFontId = (id: FontId) => {
    setFontIdState(id);
  };

  const currentFont = fonts.find((f) => f.id === fontId) || fonts[0];

  return {
    fontId,
    setFontId,
    currentFont,
    fonts,
  };
}
