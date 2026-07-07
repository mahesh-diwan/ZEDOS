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

  /* ─── UNIFIED LAYOUT (DESKTOP + MOBILE) ──────────────── */
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
        {/* Drawer backdrop (mobile only) */}
        {isMobile && (projectPanelOpen || assistantOpen || terminalOpen) && (
          <div
            onClick={() => {
              setProjectPanelOpen(false);
              setAssistantOpen(false);
              setTerminalOpen(false);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 140,
            }}
          />
        )}

        {/* Left File Tree */}
        {projectPanelOpen && (
          <aside
            role="complementary"
            aria-label="Project Explorer"
            className="project-explorer-aside"
          >
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
            <div className="terminal-dock-container">
              <TerminalDock
                onClose={() => handleToggleTerminal(false)}
                onOpenFile={handleOpenFile}
              />
            </div>
          )}
        </main>

        {/* Right AI Assistant Dock */}
        {assistantOpen && (
          <aside
            role="complementary"
            aria-label="AI Assistant"
            className="assistant-dock-aside"
          >
            <AssistantDock
              onClose={() => handleToggleAssistant(false)}
              onNavigate={handleOpenFile}
            />
          </aside>
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

      {/* Toast Container */}
      <div
        style={{
          ...styles.toastContainer,
          bottom: isMobile ? 'calc(24px + env(safe-area-inset-bottom, 0px) + 12px)' : '24px',
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
};

/* ─── SHARED STYLES ──────────────────────────────────── */
const styles: { [key: string]: React.CSSProperties } = {
  toastContainer: {
    position: 'fixed',
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
