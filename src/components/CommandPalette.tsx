import React, { useState, useEffect, useRef } from 'react';
import { Search, Monitor, Terminal, ShieldAlert, Type } from 'lucide-react';
import type { ThemeId } from '../hooks/useTheme';
import type { FontId } from '../hooks/useFont';

interface CommandPaletteProps {
  onClose: () => void;
  onOpenFile: (fileName: string) => void;
  onSelectTheme: (themeId: ThemeId) => void;
  onSelectFont: (fontId: FontId) => void;
  onToggleTerminal: () => void;
  onToggleAssistant: () => void;
}

interface CommandItem {
  id: string;
  category: 'file' | 'theme' | 'font' | 'action';
  label: string;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  onClose,
  onOpenFile,
  onSelectTheme,
  onSelectFont,
  onToggleTerminal,
  onToggleAssistant,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const commandItems: CommandItem[] = [
    // Open files
    { id: 'f-home', category: 'file', label: 'open: home.tsx', action: () => onOpenFile('home.tsx') },
    { id: 'f-about', category: 'file', label: 'open: profile.yaml', action: () => onOpenFile('profile.yaml') },
    { id: 'f-projects', category: 'file', label: 'open: projects.tf', action: () => onOpenFile('projects.tf') },
    { id: 'f-skills', category: 'file', label: 'open: skills.sh', action: () => onOpenFile('skills.sh') },
    { id: 'f-experience', category: 'file', label: 'open: experience.dockerfile', action: () => onOpenFile('experience.dockerfile') },
    { id: 'f-contact', category: 'file', label: 'open: contact.yaml', action: () => onOpenFile('contact.yaml') },
    { id: 'f-blog', category: 'file', label: 'open: blog.md', action: () => onOpenFile('blog.md') },
    { id: 'f-readme', category: 'file', label: 'open: README.md', action: () => onOpenFile('README.md') },
    { id: 'f-resume', category: 'file', label: 'open: Mahesh_Diwan_Resume.pdf', action: () => onOpenFile('Mahesh_Diwan_Resume.pdf') },
    
    // Toggle panels
    { id: 'a-term', category: 'action', label: 'terminal: Toggle Terminal Panel', action: onToggleTerminal, shortcut: 'Ctrl+`' },
    { id: 'a-asst', category: 'action', label: 'assistant: Toggle AI Assistant Panel', action: onToggleAssistant, shortcut: 'Ctrl+Shift+C' },
    
    // Themes switching
    { id: 't-tokyo-night', category: 'theme', label: 'theme: Tokyo Night (Default)', action: () => onSelectTheme('tokyo-night') },
    { id: 't-catppuccin', category: 'theme', label: 'theme: Catppuccin Macchiato', action: () => onSelectTheme('catppuccin') },
    { id: 't-dracula', category: 'theme', label: 'theme: Dracula', action: () => onSelectTheme('dracula') },
    { id: 't-nord', category: 'theme', label: 'theme: Nord Frost', action: () => onSelectTheme('nord') },
    { id: 't-rose-pine', category: 'theme', label: 'theme: Rosé Pine', action: () => onSelectTheme('rose-pine') },
    { id: 't-zed-dark', category: 'theme', label: 'theme: Zed Dark', action: () => onSelectTheme('zed-dark') },
    { id: 't-zed-light', category: 'theme', label: 'theme: Zed Light', action: () => onSelectTheme('zed-light') },
    { id: 't-one-dark', category: 'theme', label: 'theme: One Dark', action: () => onSelectTheme('one-dark') },
    { id: 't-gruvbox-dark', category: 'theme', label: 'theme: Gruvbox Dark', action: () => onSelectTheme('gruvbox-dark') },

    // Font switching
    { id: 'font-space-jetbrains', category: 'font', label: 'font: Space Grotesk + JetBrains Mono', action: () => onSelectFont('space-jetbrains') },
    { id: 'font-plus-geist', category: 'font', label: 'font: Plus Jakarta Sans + Geist Mono', action: () => onSelectFont('plus-geist') },
    { id: 'font-outfit-fira', category: 'font', label: 'font: Outfit + Fira Code', action: () => onSelectFont('outfit-fira') },
    { id: 'font-bricolage-azeret', category: 'font', label: 'font: Bricolage Grotesque + Azeret Mono', action: () => onSelectFont('bricolage-azeret') },
  ];

  useEffect(() => {
    inputRef.current?.focus();

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const filteredItems = commandItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredItems.length ? (prev + 1) % filteredItems.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredItems.length ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
        onClose();
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'file':
        return <Search size={13} style={{ color: 'var(--text-dim)' }} />;
      case 'theme':
        return <Monitor size={13} style={{ color: 'var(--accent)' }} />;
      case 'font':
        return <Type size={13} style={{ color: 'var(--blue)' }} />;
      case 'action':
        return <Terminal size={13} style={{ color: 'var(--success)' }} />;
      default:
        return <Search size={13} />;
    }
  };

  return (
    <div style={styles.overlay} className="no-select">
      <div ref={modalRef} style={styles.palette} onKeyDown={handleKeyDown} className="reveal glass-card cmd-palette-wrapper">
        {/* Input area */}
        <div style={styles.inputWrapper}>
          <Search size={16} style={{ color: 'var(--text-dim)', marginRight: '10px' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or file name..."
            style={styles.input}
          />
        </div>

        {/* Matches list */}
        <div style={styles.list}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  style={{
                    ...styles.listItem,
                    backgroundColor: isSelected ? 'var(--bg-hover)' : 'transparent',
                    borderLeft: isSelected ? '2px solid var(--accent)' : '2px solid transparent',
                  }}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div style={styles.itemLeft}>
                    {getCategoryIcon(item.category)}
                    <span 
                      style={{ 
                        ...styles.itemLabel,
                        color: isSelected ? 'var(--text-bright)' : 'var(--text)',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  {item.shortcut && (
                    <span style={styles.itemShortcut}>{item.shortcut}</span>
                  )}
                </div>
              );
            })
          ) : (
            <div style={styles.noResults}>
              <ShieldAlert size={14} style={{ marginRight: '6px', color: 'var(--error)' }} />
              <span>No matching commands found.</span>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div style={styles.footer}>
          <span>↑↓ to navigate · ↵ to select · esc to close</span>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '80px',
    zIndex: 100,
  },
  palette: {
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
    width: '500px',
    maxHeight: '330px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid var(--border)',
    backgroundColor: 'var(--bg)',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-bright)',
    fontSize: '13px',
  },
  list: {
    flex: 1,
    overflowY: 'auto',
    padding: '6px 0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '12.5px',
    transition: 'background-color 0.1s',
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  itemLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
  },
  itemShortcut: {
    fontSize: '10px',
    color: 'var(--text-dim)',
    backgroundColor: 'var(--bg-terminal)',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid var(--border)',
  },
  noResults: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    color: 'var(--text-dim)',
    fontSize: '12.5px',
  },
  footer: {
    padding: '8px 16px',
    borderTop: '1px solid var(--border)',
    backgroundColor: 'var(--bg-terminal)',
    color: 'var(--text-dim)',
    fontSize: '10px',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};
