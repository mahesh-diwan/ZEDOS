import React, { useState, useEffect, useRef } from 'react';
import { Search, Monitor, Terminal, ShieldAlert, MessageSquare } from 'lucide-react';
import type { ThemeId } from '../hooks/useTheme';

interface CommandPaletteProps {
  onClose: () => void;
  onOpenFile: (fileName: string) => void;
  onSelectTheme: (themeId: ThemeId) => void;
  onToggleTerminal: () => void;
  onToggleAssistant: () => void;
  initialCategory?: 'all' | 'theme';
}

interface CommandItem {
  id: string;
  category: 'file' | 'theme' | 'action';
  label: string;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  onClose,
  onOpenFile,
  onSelectTheme,
  onToggleTerminal,
  onToggleAssistant,
  initialCategory = 'all',
}) => {
  const [query, setQuery] = useState(initialCategory === 'theme' ? 'theme: ' : '');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const commandItems: CommandItem[] = [
    // Navigate to files
    { id: 'f-readme',   category: 'file', label: 'open: README.md',                 action: () => onOpenFile('README.md') },
    { id: 'f-about',    category: 'file', label: 'open: ABOUT.md',                  action: () => onOpenFile('ABOUT.md') },
    { id: 'f-projects', category: 'file', label: 'open: PROJECTS.md',               action: () => onOpenFile('PROJECTS.md') },
    { id: 'f-blogs',    category: 'file', label: 'open: BLOGS.md',                  action: () => onOpenFile('BLOGS.md') },
    { id: 'f-contact',  category: 'file', label: 'open: CONTACT.md',                action: () => onOpenFile('CONTACT.md') },
    { id: 'f-resume',   category: 'file', label: 'open: Mahesh_Diwan_Resume.pdf',   action: () => onOpenFile('RESUME.pdf') },

    // Toggle panels
    { id: 'a-term', category: 'action', label: 'terminal: Toggle Terminal Panel',       action: onToggleTerminal,  shortcut: 'Ctrl+`' },
    { id: 'a-asst', category: 'action', label: 'assistant: Toggle AI Assistant Panel', action: onToggleAssistant, shortcut: 'Ctrl+Shift+C' },

    // Themes
    { id: 't-tokyo-night',  category: 'theme', label: 'theme: Tokyo Night (Default)',    action: () => onSelectTheme('tokyo-night') },
    { id: 't-catppuccin',   category: 'theme', label: 'theme: Catppuccin Macchiato',     action: () => onSelectTheme('catppuccin') },
    { id: 't-dracula',      category: 'theme', label: 'theme: Dracula',                  action: () => onSelectTheme('dracula') },
    { id: 't-nord',         category: 'theme', label: 'theme: Nord Frost',               action: () => onSelectTheme('nord') },
    { id: 't-rose-pine',    category: 'theme', label: 'theme: Rosé Pine',                action: () => onSelectTheme('rose-pine') },
    { id: 't-zed-dark',     category: 'theme', label: 'theme: Zed Dark',                 action: () => onSelectTheme('zed-dark') },
    { id: 't-zed-light',    category: 'theme', label: 'theme: Zed Light',                action: () => onSelectTheme('zed-light') },
    { id: 't-one-dark',     category: 'theme', label: 'theme: One Dark',                 action: () => onSelectTheme('one-dark') },
    { id: 't-gruvbox-dark', category: 'theme', label: 'theme: Gruvbox Dark',             action: () => onSelectTheme('gruvbox-dark') },
  ];

  useEffect(() => {
    // Focus without triggering visible ring — handled by .cmd-palette-input CSS override
    inputRef.current?.focus();

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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
      case 'file':   return <Search      size={13} style={{ color: 'var(--text-dim)' }} />;
      case 'theme':  return <Monitor     size={13} style={{ color: 'var(--accent)' }} />;
      case 'action': return <Terminal    size={13} style={{ color: 'var(--success)' }} />;
      default:       return <Search      size={13} />;
    }
  };

  return (
    <div style={styles.overlay} className="no-select">
      <div
        ref={modalRef}
        style={styles.palette}
        onKeyDown={handleKeyDown}
        className="reveal glass-card cmd-palette-wrapper"
      >
        {/* Search input */}
        <div style={styles.inputWrapper}>
          <Search size={15} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, file name, or theme..."
            style={styles.input}
            className="cmd-palette-input"
          />
        </div>

        {/* Results list */}
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
                  onClick={() => { item.action(); onClose(); }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div style={styles.itemLeft}>
                    {getCategoryIcon(item.category)}
                    <span style={{
                      ...styles.itemLabel,
                      color: isSelected ? 'var(--text-bright)' : 'var(--text)',
                    }}>
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

        {/* Footer */}
        <div style={styles.footer}>
          <span>↑↓ navigate · ↵ select · esc close</span>
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
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '80px',
    zIndex: 200,
  },
  palette: {
    /* glass-card class handles glass bg/border/shadow */
    borderRadius: '10px',
    width: '520px',
    maxHeight: '360px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    borderBottom: '1px solid var(--glass-border)',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-bright)',
    fontSize: '13px',
    fontFamily: 'var(--font-ui)',
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
    padding: '9px 16px',
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid var(--glass-border)',
  },
  noResults: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '28px',
    color: 'var(--text-dim)',
    fontSize: '12.5px',
  },
  footer: {
    padding: '8px 16px',
    borderTop: '1px solid var(--glass-border)',
    backgroundColor: 'rgba(0,0,0,0.15)',
    color: 'var(--text-dim)',
    fontSize: '10px',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};
