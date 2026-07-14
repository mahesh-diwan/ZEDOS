import React, { useState, useEffect, useRef } from 'react';
import { Search, File, Monitor, Terminal, AlertTriangle } from 'lucide-react';
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
  description?: string;
  action: () => void;
  shortcut?: string;
  accentColor?: string; // for theme previews
}

interface ThemePreview {
  id: ThemeId;
  name: string;
  accent: string;
  bg: string;
}

const THEME_PREVIEWS: ThemePreview[] = [
  { id: 'catppuccin', name: 'Catppuccin Mocha', accent: '#cba6f7', bg: '#1e1e2e' },
  { id: 'warm-paper', name: 'Warm Paper',       accent: '#a0522d', bg: '#fbf0e3' },
];

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
  const selectedRef = useRef<HTMLDivElement>(null);

  const commandItems: CommandItem[] = [
    // Navigate to files
    { id: 'f-readme',   category: 'file',   label: 'README.md',                     description: 'Home · Portfolio overview',          action: () => onOpenFile('README.md') },
    { id: 'f-about',    category: 'file',   label: 'ABOUT.md',                      description: 'Bio · Skills · Experience',           action: () => onOpenFile('ABOUT.md') },
    { id: 'f-projects', category: 'file',   label: 'PROJECTS.md',                   description: 'DevOps & Cloud projects',             action: () => onOpenFile('PROJECTS.md') },
    { id: 'f-blogs',    category: 'file',   label: 'BLOGS.md',                      description: 'Articles & writing',                  action: () => onOpenFile('BLOGS.md') },
    { id: 'f-contact',  category: 'file',   label: 'CONTACT.md',                    description: 'Get in touch',                        action: () => onOpenFile('CONTACT.md') },
    { id: 'f-resume',   category: 'file',   label: 'Mahesh_Diwan_Resume.pdf',       description: 'Download resume',                     action: () => onOpenFile('RESUME.pdf') },

    // Actions
    { id: 'a-term', category: 'action', label: 'Toggle Terminal',     description: 'Open/close terminal panel',  action: onToggleTerminal,  shortcut: 'Ctrl+`' },
    { id: 'a-asst', category: 'action', label: 'Toggle AI Assistant', description: 'Open/close assistant dock', action: onToggleAssistant, shortcut: 'Ctrl+⇧C' },

    // Themes — matched via accentColor
    ...THEME_PREVIEWS.map(t => ({
      id: `t-${t.id}`,
      category: 'theme' as const,
      label: t.name,
      description: 'Switch theme',
      action: () => onSelectTheme(t.id),
      accentColor: t.accent,
    })),
  ];

  useEffect(() => {
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

  const filteredItems = commandItems.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    // Shorthand prefix filters
    if (q.startsWith('theme:') || q.startsWith('theme ')) {
      const sub = q.replace(/^theme[\s:]+/, '');
      return item.category === 'theme' && item.label.toLowerCase().includes(sub);
    }
    if (q.startsWith('open:') || q.startsWith('open ')) {
      const sub = q.replace(/^open[\s:]+/, '');
      return item.category === 'file' && item.label.toLowerCase().includes(sub);
    }
    return (
      item.label.toLowerCase().includes(q) ||
      (item.description?.toLowerCase().includes(q) ?? false)
    );
  });

  // Group results by category
  const grouped: { [cat: string]: CommandItem[] } = {};
  filteredItems.forEach(item => {
    const cat = item.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  // Flatten for keyboard navigation
  const flatItems: CommandItem[] = [
    ...(grouped['file'] || []),
    ...(grouped['action'] || []),
    ...(grouped['theme'] || []),
  ];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (flatItems.length ? (prev + 1) % flatItems.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (flatItems.length ? (prev - 1 + flatItems.length) % flatItems.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatItems[selectedIndex]) {
        flatItems[selectedIndex].action();
        onClose();
      }
    }
  };

  const getCategoryLabel = (cat: string) => {
    if (cat === 'file') return 'Navigate';
    if (cat === 'action') return 'Actions';
    if (cat === 'theme') return 'Themes';
    return cat;
  };

  const getCategoryIcon = (cat: string) => {
    if (cat === 'file')   return <File      size={12} style={{ color: 'var(--text-muted)' }} />;
    if (cat === 'action') return <Terminal  size={12} style={{ color: 'var(--success)' }} />;
    if (cat === 'theme')  return <Monitor   size={12} style={{ color: 'var(--accent)' }} />;
    return null;
  };

  const renderGroup = (cat: string, items: CommandItem[]) => {
    const categoryStart = cat === 'file' ? 0 :
      cat === 'action' ? (grouped['file']?.length || 0) :
      (grouped['file']?.length || 0) + (grouped['action']?.length || 0);

    return (
      <div key={cat}>
        {/* Section header */}
        <div style={paletteStyles.sectionHeader}>
          {getCategoryIcon(cat)}
          <span style={paletteStyles.sectionLabel}>{getCategoryLabel(cat)}</span>
        </div>

        {items.map((item, localIdx) => {
          const globalIdx = categoryStart + localIdx;
          const isSelected = globalIdx === selectedIndex;
          return (
            <div
              key={item.id}
              ref={isSelected ? selectedRef : undefined}
              style={{
                ...paletteStyles.listItem,
                backgroundColor: isSelected ? 'var(--surface-hover)' : 'transparent',
                borderLeft: isSelected
                  ? '2px solid var(--accent)'
                  : '2px solid transparent',
              }}
              onClick={() => { item.action(); onClose(); }}
              onMouseEnter={() => setSelectedIndex(globalIdx)}
            >
              <div style={paletteStyles.itemLeft}>
                {/* Theme preview swatch */}
                {item.accentColor && (
                  <span style={{
                    ...paletteStyles.themeSwatch,
                    backgroundColor: item.accentColor,
                    boxShadow: isSelected ? `0 0 6px ${item.accentColor}` : 'none',
                  }} />
                )}
                <div>
                  <div style={{
                    ...paletteStyles.itemLabel,
                    color: isSelected ? 'var(--text-bright)' : 'var(--text)',
                  }}>
                    {item.label}
                  </div>
                  {item.description && (
                    <div style={paletteStyles.itemDescription}>
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
              {item.shortcut && (
                <kbd style={paletteStyles.itemShortcut}>{item.shortcut}</kbd>
              )}
              {!item.shortcut && isSelected && (
                <span style={paletteStyles.returnHint}>↵</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={paletteStyles.overlay} className="no-select">
      <div
        ref={modalRef}
        style={paletteStyles.palette}
        onKeyDown={handleKeyDown}
        className="reveal glass-card cmd-palette-wrapper"
      >
        {/* Search input */}
        <div style={paletteStyles.inputWrapper}>
          <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, file, or theme…"
            style={paletteStyles.input}
            className="cmd-palette-input"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={paletteStyles.clearBtn}
              tabIndex={-1}
            >
              ✕
            </button>
          )}
        </div>

        {/* Hint pills */}
        <div style={paletteStyles.hintBar}>
          {[
            { label: 'theme:', prefix: 'theme: ' },
            { label: 'open:', prefix: 'open: ' },
          ].map(h => (
            <button
              key={h.label}
              style={paletteStyles.hintPill}
              onClick={() => { setQuery(h.prefix); inputRef.current?.focus(); }}
            >
              {h.label}
            </button>
          ))}
        </div>

        {/* Results list */}
        <div style={paletteStyles.list}>
          {flatItems.length > 0 ? (
            <div>
              {(['file', 'action', 'theme'] as const).map(cat =>
                grouped[cat]?.length ? renderGroup(cat, grouped[cat]) : null
              )}
            </div>
          ) : (
            <div style={paletteStyles.noResults}>
              <AlertTriangle size={16} style={{ color: 'var(--error)', marginRight: '8px' }} />
              <span>No commands match "{query}"</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={paletteStyles.footer}>
          <span style={paletteStyles.footerHint}>↑↓ navigate</span>
          <span style={paletteStyles.footerSep}>·</span>
          <span style={paletteStyles.footerHint}>↵ select</span>
          <span style={paletteStyles.footerSep}>·</span>
          <span style={paletteStyles.footerHint}>esc close</span>
        </div>
      </div>
    </div>
  );
};

const paletteStyles: { [key: string]: React.CSSProperties } = {
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
    zIndex: 300,
  },
  palette: {
    borderRadius: '12px',
    width: '540px',
    maxHeight: '440px',
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
    background: 'var(--glass-bg)',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-bright)',
    fontSize: '14px',
    fontFamily: 'var(--font-ui)',
    caretColor: 'var(--accent)',
  },
  clearBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    fontSize: '12px',
    padding: '2px 4px',
    borderRadius: '4px',
    flexShrink: 0,
    lineHeight: 1,
  },
  hintBar: {
    display: 'flex',
    gap: '6px',
    padding: '8px 16px',
    borderBottom: '1px solid var(--glass-border)',
    flexShrink: 0,
    background: 'var(--glass-bg)',
  },
  hintPill: {
    background: 'var(--accent-tint)',
    border: '1px solid var(--accent-border)',
    color: 'var(--accent)',
    borderRadius: '5px',
    padding: '2px 8px',
    fontSize: '11px',
    fontFamily: 'var(--font-mono)',
    cursor: 'pointer',
    transition: 'background 0.15s, box-shadow 0.15s',
  },
  list: {
    flex: 1,
    overflowY: 'auto',
    padding: '4px 0',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px 4px',
    marginTop: '4px',
  },
  sectionLabel: {
    fontSize: '10px',
    fontWeight: 700,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '9px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.1s',
    gap: '8px',
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
    minWidth: 0,
  },
  themeSwatch: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
    transition: 'box-shadow 0.15s',
  },
  itemLabel: {
    fontSize: '13px',
    fontFamily: 'var(--font-ui)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  itemDescription: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    marginTop: '1px',
    fontFamily: 'var(--font-mono)',
  },
  itemShortcut: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    backgroundColor: 'var(--glass-bg)',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid var(--glass-border)',
    fontFamily: 'var(--font-mono)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  returnHint: {
    fontSize: '11px',
    color: 'var(--accent)',
    flexShrink: 0,
    opacity: 0.7,
  },
  noResults: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 28px',
    color: 'var(--text-muted)',
    fontSize: '13px',
  },
  footer: {
    padding: '8px 16px',
    borderTop: '1px solid var(--glass-border)',
    background: 'var(--glass-bg)',
    color: 'var(--text-muted)',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    flexShrink: 0,
  },
  footerHint: {
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
  },
  footerSep: {
    color: 'var(--border)',
  },
};
