import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import type { ThemeId } from './hooks/useTheme';
import { TitleBar } from './components/TitleBar';
import { ProjectPanel } from './components/ProjectPanel';
import { EditorArea } from './components/EditorArea';
import { TerminalDock } from './components/TerminalDock';
import { AssistantDock } from './components/AssistantDock';
import { CommandPalette } from './components/CommandPalette';
import { StatusBar } from './components/StatusBar';
import {
  Download,
  Home,
  User,
  Folder,
  BookOpen,
  Mail,
  Palette,
  Sparkles,
  X,
} from 'lucide-react';

interface Toast {
  id: string;
  icon: string;
  msg: string;
}

export const App: React.FC = () => {
  const { themeId, setThemeId, themes } = useTheme();

  // Layout States
  const [projectPanelOpen, setProjectPanelOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [cmdPaletteCategory, setCmdPaletteCategory] = useState<'all' | 'theme'>('all');

  const handleOpenCmdPalette = (category: 'all' | 'theme' = 'all') => {
    setCmdPaletteCategory(category);
    setCmdPaletteOpen(true);
  };

  // File States — all tabs open by default
  const [openFiles, setOpenFiles] = useState<string[]>([
    'README.md',
    'ABOUT.md',
    'PROJECTS.md',
    'BLOGS.md',
    'RESUME.pdf',
    'CONTACT.md',
  ]);
  const [activeFile, setActiveFile] = useState<string>('README.md');

  // Toast State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // isMobile — viewport width only, no maxTouchPoints
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile, lock body scroll only when assistant is open
  useEffect(() => {
    if (isMobile && assistantOpen) {
      document.body.style.setProperty('overflow', 'hidden', 'important');
    } else {
      document.body.style.removeProperty('overflow');
    }
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isMobile, assistantOpen]);

  // Panel toggles
  const handleToggleProject = useCallback((val?: boolean | ((prev: boolean) => boolean)) => {
    setProjectPanelOpen((prev) => {
      const next = typeof val === 'function' ? val(prev) : val !== undefined ? val : !prev;
      if (next && isMobile) {
        setTerminalOpen(false);
        setAssistantOpen(false);
      }
      return next;
    });
  }, [isMobile]);

  const handleToggleTerminal = useCallback((val?: boolean | ((prev: boolean) => boolean)) => {
    setTerminalOpen((prev) => {
      const next = typeof val === 'function' ? val(prev) : val !== undefined ? val : !prev;
      if (next && isMobile) {
        setProjectPanelOpen(false);
        setAssistantOpen(false);
      }
      return next;
    });
  }, [isMobile]);

  const handleToggleAssistant = useCallback((val?: boolean | ((prev: boolean) => boolean)) => {
    setAssistantOpen((prev) => {
      const next = typeof val === 'function' ? val(prev) : val !== undefined ? val : !prev;
      if (next && isMobile) {
        setProjectPanelOpen(false);
        setTerminalOpen(false);
      }
      return next;
    });
  }, [isMobile]);

  // Global Keyboard Shortcuts (desktop)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault(); handleToggleProject();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault(); handleToggleTerminal();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault(); handleToggleAssistant();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault(); handleOpenCmdPalette('all');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleProject, handleToggleTerminal, handleToggleAssistant]);

  const addToast = (icon: string, msg: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, icon, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleOpenFile = (fileName: string) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles((prev) => [...prev, fileName]);
    }
    setActiveFile(fileName);
    if (isMobile) setProjectPanelOpen(false);
  };

  const handleCloseFile = (fileName: string) => {
    const remaining = openFiles.filter((f) => f !== fileName);
    setOpenFiles(remaining);
    if (activeFile === fileName && remaining.length > 0) {
      setActiveFile(remaining[remaining.length - 1]);
    }
  };

  const handleThemeSelect = (theme: ThemeId) => {
    setThemeId(theme);
    const themeName = themes.find((t) => t.id === theme)?.name || theme;
    addToast('🎨', `Theme switched to ${themeName}`);
  };

  /* ─── MOBILE LAYOUT ─────────────────────────────────── */
  if (isMobile) {
    return (
      <div className={`app-container mobile-app-layout theme-${themeId}`}>

        {/* Mobile Header — glass surface applied via CSS */}
        <header className="no-select" role="banner">
          {/* Left: ZEDOS branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={mobileStyles.brandChip}>
              <span style={mobileStyles.brandDot} />
              <span style={mobileStyles.brandTitle}>ZEDOS</span>
            </div>
          </div>

          {/* Right: Resume, Palette, AI Assistant */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href="./Mahesh_Diwan_Resume.pdf"
              download="Mahesh_Diwan_Resume.pdf"
              className="btn-primary"
              style={{ fontSize: '11px', padding: '6px 12px', borderRadius: '5px' }}
              title="Download Resume"
            >
              <Download size={11} />
              Resume
            </a>
            <button
              onClick={() => handleOpenCmdPalette('theme')}
              style={mobileStyles.iconBtn}
              title="Themes"
              aria-label="Open theme switcher"
            >
              <Palette size={16} />
            </button>
            <button
              onClick={() => setAssistantOpen(!assistantOpen)}
              style={{
                ...mobileStyles.iconBtn,
                color: assistantOpen ? 'var(--accent)' : 'var(--text-dim)',
                borderColor: assistantOpen ? 'var(--accent-border)' : 'var(--glass-border)',
              }}
              title="AI Assistant"
              aria-label="Toggle AI Assistant"
            >
              <Sparkles size={16} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="mobile-main-content">
          <EditorArea
            activeFile={activeFile}
            setActiveFile={handleOpenFile}
            openFiles={openFiles}
            closeFile={handleCloseFile}
            onToast={addToast}
          />
        </main>

        {/* Bottom Nav — 5 direct destinations — glass applied via CSS */}
        <nav className="no-select" role="navigation" aria-label="Main navigation">
          {[
            { file: 'README.md',  icon: <Home size={19} />,     label: 'Home' },
            { file: 'ABOUT.md',   icon: <User size={19} />,     label: 'About' },
            { file: 'PROJECTS.md', icon: <Folder size={19} />,  label: 'Projects' },
            { file: 'BLOGS.md',   icon: <BookOpen size={19} />, label: 'Blog' },
            { file: 'CONTACT.md', icon: <Mail size={19} />,     label: 'Contact' },
          ].map(({ file, icon, label }) => (
            <button
              key={file}
              style={{
                ...mobileStyles.navBtn,
                color: activeFile === file ? 'var(--accent)' : 'var(--text-dim)',
              }}
              onClick={() => handleOpenFile(file)}
              aria-current={activeFile === file ? 'page' : undefined}
              aria-label={label}
            >
              {icon}
              <span style={{
                ...mobileStyles.navLabel,
                fontWeight: activeFile === file ? 700 : 500,
              }}>
                {label}
              </span>
            </button>
          ))}
        </nav>

        {/* AI Assistant Slide-up Bottom Sheet */}
        {assistantOpen && (
          <div style={mobileStyles.overlayBackdrop} onClick={() => setAssistantOpen(false)}>
            <div
              className="assistant-sheet-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <AssistantDock
                onClose={() => setAssistantOpen(false)}
                onNavigate={handleOpenFile}
              />
            </div>
          </div>
        )}

        {/* Command Palette */}
        {cmdPaletteOpen && (
          <CommandPalette
            onClose={() => setCmdPaletteOpen(false)}
            onOpenFile={handleOpenFile}
            onSelectTheme={handleThemeSelect}
            onToggleTerminal={() => handleToggleTerminal()}
            onToggleAssistant={() => handleToggleAssistant()}
            initialCategory={cmdPaletteCategory}
          />
        )}

        {/* Toast — above bottom nav */}
        <div
          style={{
            ...styles.toastContainer,
            bottom: 'calc(60px + env(safe-area-inset-bottom, 0px) + 12px)',
            left: '12px',
            right: '12px',
          }}
          className="no-select"
        >
          {toasts.map((toast) => (
            <div key={toast.id} style={styles.toastCard} className="animate-slide-up">
              <span style={styles.toastIcon}>{toast.icon}</span>
              <span style={styles.toastMsg}>{toast.msg}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ─── DESKTOP LAYOUT ─────────────────────────────────── */
  return (
    <div className={`app-container theme-${themeId}`}>
      {/* Title bar */}
      <TitleBar
        activeFile={activeFile}
        projectPanelOpen={projectPanelOpen}
        setProjectPanelOpen={handleToggleProject}
        terminalOpen={terminalOpen}
        setTerminalOpen={handleToggleTerminal}
        assistantOpen={assistantOpen}
        setAssistantOpen={handleToggleAssistant}
        onOpenCmdPalette={handleOpenCmdPalette}
      />

      {/* Workspace */}
      <div className="main-layout" style={{ position: 'relative' }}>
        {/* Drawer backdrop */}
        {isMobile && (projectPanelOpen || assistantOpen) && (
          <div
            onClick={() => { setProjectPanelOpen(false); setAssistantOpen(false); }}
            style={{
              position: 'fixed', top: 0, left: 0,
              width: '100vw', height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 99,
            }}
          />
        )}

        {/* Left File Tree */}
        {projectPanelOpen && (
          <aside role="complementary" aria-label="Project Explorer" style={{ width: '210px', flexShrink: 0, height: '100%' }}>
            <ProjectPanel
              activeFile={activeFile}
              onFileSelect={handleOpenFile}
              openFiles={openFiles}
              onClose={() => setProjectPanelOpen(false)}
            />
          </aside>
        )}

        {/* Editor + Terminal */}
        <main role="main" className="editor-terminal-container">
          <EditorArea
            activeFile={activeFile}
            setActiveFile={handleOpenFile}
            openFiles={openFiles}
            closeFile={handleCloseFile}
            onToast={addToast}
          />
          {terminalOpen && (
            <TerminalDock
              onClose={() => handleToggleTerminal(false)}
              onOpenFile={handleOpenFile}
            />
          )}
        </main>

        {/* Right AI Assistant Dock */}
        {assistantOpen && (
          <AssistantDock
            onClose={() => handleToggleAssistant(false)}
            onNavigate={handleOpenFile}
          />
        )}
      </div>

      {/* Status Bar */}
      <StatusBar activeFile={activeFile} />

      {/* Command Palette */}
      {cmdPaletteOpen && (
        <CommandPalette
          onClose={() => setCmdPaletteOpen(false)}
          onOpenFile={handleOpenFile}
          onSelectTheme={handleThemeSelect}
          onToggleTerminal={() => handleToggleTerminal()}
          onToggleAssistant={() => handleToggleAssistant()}
          initialCategory={cmdPaletteCategory}
        />
      )}

      {/* Toast */}
      <div style={styles.toastContainer} className="no-select">
        {toasts.map((toast) => (
          <div key={toast.id} style={styles.toastCard} className="animate-slide-up">
            <span style={styles.toastIcon}>{toast.icon}</span>
            <span style={styles.toastMsg}>{toast.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const mobileStyles: { [key: string]: React.CSSProperties } = {
  brandChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'var(--accent-dim)',
    border: '1px solid var(--accent-border)',
    borderRadius: '6px',
    padding: '3px 10px 3px 8px',
  },
  brandDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent)',
    display: 'inline-block',
    animation: 'pulseSuccess 2s infinite ease-in-out',
  },
  brandTitle: {
    fontSize: '13px',
    fontWeight: 800,
    color: 'var(--text-bright)',
    letterSpacing: '0.08em',
  },
  iconBtn: {
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid var(--glass-border)',
    color: 'var(--text-muted)',
    borderRadius: '6px',
    width: '36px',
    height: '36px',
    minWidth: '44px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
    transition: 'color 0.2s, border-color 0.2s',
  },
  navBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3px',
    flex: 1,
    height: '100%',
    minHeight: '44px',
    cursor: 'pointer',
    padding: '4px 0',
    transition: 'color 0.15s',
  },
  navLabel: {
    fontSize: '11px',
    letterSpacing: '0.01em',
    fontWeight: 500,
  },
  overlayBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
};

/* ─── SHARED STYLES ──────────────────────────────────── */
const styles: { [key: string]: React.CSSProperties } = {
  toastContainer: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    zIndex: 9999,
  },
  toastCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid var(--glass-border)',
    borderLeft: '3px solid var(--accent)',
    borderRadius: '8px',
    padding: '10px 16px',
    boxShadow: 'var(--glass-shadow)',
    minWidth: '220px',
  },
  toastIcon: {
    fontSize: '14px',
  },
  toastMsg: {
    fontSize: '13px',
    color: 'var(--text-bright)',
    fontWeight: 500,
  },
};
