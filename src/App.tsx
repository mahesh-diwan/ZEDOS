import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import type { ThemeId } from './hooks/useTheme';
import { useFont } from './hooks/useFont';
import type { FontId } from './hooks/useFont';
import { TitleBar } from './components/TitleBar';
import { ProjectPanel } from './components/ProjectPanel';
import { EditorArea } from './components/EditorArea';
import { TerminalDock } from './components/TerminalDock';
import { AssistantDock } from './components/AssistantDock';
import { CommandPalette } from './components/CommandPalette';
import { StatusBar } from './components/StatusBar';
import { Menu, Download, Mail, Home, User, Folder, Award, Terminal as TerminalIcon } from 'lucide-react';

interface Toast {
  id: string;
  icon: string;
  msg: string;
}

export const App: React.FC = () => {
  const { setThemeId, themes } = useTheme();
  const { setFontId, fonts } = useFont();

  // Layout States
  const [projectPanelOpen, setProjectPanelOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);

  // File States
  const [openFiles, setOpenFiles] = useState<string[]>([
    'README.md',
    'ABOUT.md',
  ]);
  const [activeFile, setActiveFile] = useState<string>('README.md');

  // Custom Toast State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Retro Dual Cursor States
  const [innerPos, setInnerPos] = useState({ x: -100, y: -100 });
  const [outerPos, setOuterPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const innerRef = useRef({ x: -100, y: -100 });
  const outerRef = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number | null>(null);

  // Check mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 || 
        navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track Mouse movement and trailing physics for custom cursor
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      innerRef.current = { x: e.clientX, y: e.clientY };
      setInnerPos({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null || 
        target.closest('a') !== null ||
        target.closest('.file-tree-row') !== null ||
        target.closest('.social-card-item') !== null ||
        target.closest('.other-skill-tag') !== null ||
        target.style.cursor === 'pointer';
        
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Lerp calculation for smooth trailing ring motion
    const animateCursor = () => {
      const dx = innerRef.current.x - outerRef.current.x;
      const dy = innerRef.current.y - outerRef.current.y;
      
      // Lerping factor - 5 is a sweet spot for responsive but smooth lag
      outerRef.current.x += dx / 5;
      outerRef.current.y += dy / 5;
      
      setOuterPos({ x: outerRef.current.x, y: outerRef.current.y });
      requestRef.current = requestAnimationFrame(animateCursor);
    };
    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isMobile]);

  // Panel toggle handlers with mobile overlay constraints
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

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Toggle Project Panel (Ctrl + B)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        handleToggleProject();
      }
      
      // 2. Toggle Terminal (Ctrl + `)
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        handleToggleTerminal();
      }

      // 3. Toggle Assistant (Ctrl + Shift + C)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleToggleAssistant();
      }

      // 4. Open Command Palette (Ctrl + P)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setCmdPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, handleToggleProject, handleToggleTerminal, handleToggleAssistant]);

  const addToast = (icon: string, msg: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, icon, msg }]);
    
    // Auto remove
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleOpenFile = (fileName: string) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles((prev) => [...prev, fileName]);
    }
    setActiveFile(fileName);
    if (isMobile) {
      setProjectPanelOpen(false);
    }
  };

  const handleCloseFile = (fileName: string) => {
    const remaining = openFiles.filter((f) => f !== fileName);
    setOpenFiles(remaining);

    // If active file is closed, select another one
    if (activeFile === fileName && remaining.length > 0) {
      setActiveFile(remaining[remaining.length - 1]);
    }
  };

  const handleThemeSelect = (theme: ThemeId) => {
    setThemeId(theme);
    const themeName = themes.find((t) => t.id === theme)?.name || theme;
    addToast('🎨', `Theme switched to ${themeName}`);
  };

  const handleFontSelect = (font: FontId) => {
    setFontId(font);
    const fontName = fonts.find((f) => f.id === font)?.name || font;
    addToast('🔤', `Typography switched to ${fontName}`);
  };

  if (isMobile) {
    return (
      <div 
        className="app-container mobile-app-layout"
        style={{ 
          cursor: 'auto',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          backgroundColor: 'var(--bg)',
          position: 'relative'
        }}
      >
        {/* Mobile Header Bar */}
        <header style={mobileStyles.header} className="no-select">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              style={mobileStyles.menuBtn} 
              onClick={() => setProjectPanelOpen(true)}
              title="Open Navigation Explorer"
            >
              <Menu size={20} />
            </button>
            <span style={mobileStyles.headerTitle}>ZEDOS</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a 
              href="/Mahesh_Diwan_Resume.pdf" 
              download="Mahesh_Diwan_Resume.pdf"
              style={mobileStyles.headerDownloadBtn}
              title="Download Resume (1-click)"
            >
              <Download size={13} style={{ marginRight: '4px' }} />
              <span>Resume</span>
            </a>
            <button 
              onClick={() => handleOpenFile('CONTACT.md')}
              style={mobileStyles.headerMailBtn}
              title="Contact Me"
            >
              <Mail size={15} />
            </button>
          </div>
        </header>

        {/* Content Body viewport (Full width content, single main scroll container) */}
        <main style={mobileStyles.contentBody}>
          <EditorArea
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            openFiles={openFiles}
            closeFile={handleCloseFile}
            onToast={addToast}
          />
        </main>

        {/* Bottom Tab Navigation Bar */}
        <nav style={mobileStyles.bottomNav} className="no-select">
          <button 
            style={{ 
              ...mobileStyles.navBtn, 
              color: activeFile === 'README.md' ? 'var(--accent)' : 'var(--text-dim)' 
            }}
            onClick={() => handleOpenFile('README.md')}
          >
            <Home size={18} />
            <span style={mobileStyles.navLabel}>Home</span>
          </button>
          <button 
            style={{ 
              ...mobileStyles.navBtn, 
              color: activeFile === 'ABOUT.md' ? 'var(--accent)' : 'var(--text-dim)' 
            }}
            onClick={() => handleOpenFile('ABOUT.md')}
          >
            <User size={18} />
            <span style={mobileStyles.navLabel}>About</span>
          </button>
          <button 
            style={{ 
              ...mobileStyles.navBtn, 
              color: activeFile === 'PROJECTS.md' ? 'var(--accent)' : 'var(--text-dim)' 
            }}
            onClick={() => handleOpenFile('PROJECTS.md')}
          >
            <Folder size={18} />
            <span style={mobileStyles.navLabel}>Projects</span>
          </button>
          <button 
            style={{ 
              ...mobileStyles.navBtn, 
              color: activeFile === 'CERTIFICATIONS.md' ? 'var(--accent)' : 'var(--text-dim)' 
            }}
            onClick={() => handleOpenFile('CERTIFICATIONS.md')}
          >
            <Award size={18} />
            <span style={mobileStyles.navLabel}>Credentials</span>
          </button>
          <button 
            style={{ 
              ...mobileStyles.navBtn, 
              color: terminalOpen ? 'var(--accent)' : 'var(--text-dim)' 
            }}
            onClick={() => {
              setTerminalOpen(!terminalOpen);
            }}
          >
            <TerminalIcon size={18} />
            <span style={mobileStyles.navLabel}>Terminal</span>
          </button>
        </nav>

        {/* Sliding Explorer Drawer */}
        {projectPanelOpen && (
          <div style={mobileStyles.overlayContainer} className="drawer-overlay">
            <div 
              style={mobileStyles.drawerBackdrop} 
              onClick={() => setProjectPanelOpen(false)}
            />
            <div style={mobileStyles.drawer} className="project-sidebar">
              <ProjectPanel
                activeFile={activeFile}
                onFileSelect={handleOpenFile}
                openFiles={openFiles}
              />
            </div>
          </div>
        )}

        {/* Slide-up Terminal Bottom Sheet */}
        {terminalOpen && (
          <div style={mobileStyles.overlayContainer} className="terminal-overlay">
            <div 
              style={mobileStyles.drawerBackdrop} 
              onClick={() => setTerminalOpen(false)}
            />
            <div style={mobileStyles.terminalSheet} className="terminal-dock-panel animate-slide-up">
              <TerminalDock
                onClose={() => setTerminalOpen(false)}
                onOpenFile={handleOpenFile}
              />
            </div>
          </div>
        )}

        {/* Global Toast System */}
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
  }

  return (
    <div 
      className={`app-container ${!isMobile ? 'custom-cursor-active' : ''}`}
      style={{ cursor: isMobile ? 'auto' : 'none' }}
    >
      {/* 1. Title bar */}
      <TitleBar
        activeFile={activeFile}
        projectPanelOpen={projectPanelOpen}
        setProjectPanelOpen={handleToggleProject}
        terminalOpen={terminalOpen}
        setTerminalOpen={handleToggleTerminal}
        assistantOpen={assistantOpen}
        setAssistantOpen={handleToggleAssistant}
        onOpenCmdPalette={() => setCmdPaletteOpen(true)}
      />

      {/* 2. Workspace Content Layout */}
      <div className="main-layout" style={{ position: 'relative' }}>
        {/* Left Side File Tree */}
        {projectPanelOpen && (
          <ProjectPanel
            activeFile={activeFile}
            onFileSelect={handleOpenFile}
            openFiles={openFiles}
          />
        )}

        {/* Center / Editor + Terminal Area */}
        <div className="editor-terminal-container">
          <EditorArea
            activeFile={activeFile}
            setActiveFile={setActiveFile}
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
        </div>

        {/* Right AI Assistant Dock */}
        {assistantOpen && (
          <AssistantDock
            onClose={() => handleToggleAssistant(false)}
            onNavigate={handleOpenFile}
          />
        )}
      </div>

      {/* 3. Status Bar */}
      <StatusBar activeFile={activeFile} />

      {/* 4. Command Palette Dialog */}
      {cmdPaletteOpen && (
        <CommandPalette
          onClose={() => setCmdPaletteOpen(false)}
          onOpenFile={handleOpenFile}
          onSelectTheme={handleThemeSelect}
          onSelectFont={handleFontSelect}
          onToggleTerminal={() => handleToggleTerminal()}
          onToggleAssistant={() => handleToggleAssistant()}
        />
      )}

      {/* 4. Global Toast System */}
      <div style={styles.toastContainer} className="no-select">
        {toasts.map((toast) => (
          <div key={toast.id} style={styles.toastCard} className="animate-slide-up">
            <span style={styles.toastIcon}>{toast.icon}</span>
            <span style={styles.toastMsg}>{toast.msg}</span>
          </div>
        ))}
      </div>

      {/* 5. Custom Retro Spring Cursor (hide on mobile) */}
      {!isMobile && (
        <>
          {/* Inner solid coordinate dot */}
          <div 
            style={{
              ...styles.customCursorDot,
              left: `${innerPos.x}px`,
              top: `${innerPos.y}px`,
              transform: `translate(-50%, -50%) scale(${isClicked ? 0.6 : 1})`,
              backgroundColor: isHovering ? 'var(--accent)' : 'var(--text-bright)',
            }}
          />
          {/* Outer trailing organic ring */}
          <div 
            style={{
              ...styles.customCursorRing,
              left: `${outerPos.x}px`,
              top: `${outerPos.y}px`,
              transform: `translate(-50%, -50%) scale(${
                isHovering ? (isClicked ? 1.2 : 1.5) : (isClicked ? 0.8 : 1)
              })`,
              borderColor: isHovering ? 'var(--accent)' : 'var(--text-bright)',
              backgroundColor: isHovering ? 'var(--accent-dim)' : 'transparent',
              boxShadow: isHovering 
                ? '0 0 12px var(--accent-dim), inset 0 0 8px var(--accent-dim)' 
                : 'none',
            }}
          />
        </>
      )}
    </div>
  );
};

const mobileStyles: { [key: string]: React.CSSProperties } = {
  header: {
    height: '48px',
    backgroundColor: 'var(--bg-titlebar)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    zIndex: 50,
    flexShrink: 0,
  },
  menuBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-bright)',
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  headerTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--text-bright)',
    letterSpacing: '0.05em',
  },
  headerDownloadBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--accent)',
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(167, 139, 250, 0.2)',
  },
  headerMailBtn: {
    backgroundColor: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text-bright)',
    borderRadius: '4px',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
  },
  contentBody: {
    flex: 1,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  bottomNav: {
    height: '56px',
    backgroundColor: 'var(--bg-sidebar)',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 4px',
    zIndex: 50,
    flexShrink: 0,
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
    cursor: 'pointer',
    padding: 0,
  },
  navLabel: {
    fontSize: '9.5px',
    fontWeight: 600,
  },
  overlayContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    display: 'flex',
  },
  drawerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '240px',
    backgroundColor: 'var(--bg-sidebar)',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  terminalSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    backgroundColor: 'var(--bg-terminal)',
    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
    zIndex: 100,
    borderTop: '1px solid var(--border)',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    overflow: 'hidden',
  },
};

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
    backgroundColor: 'var(--bg-sidebar)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '8px 16px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
    minWidth: '220px',
  },
  toastIcon: {
    fontSize: '14px',
  },
  toastMsg: {
    fontSize: '12px',
    color: 'var(--text-bright)',
    fontWeight: 500,
  },
  customCursorRing: {
    position: 'fixed',
    width: '24px',
    height: '24px',
    border: '1.5px solid var(--text-bright)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 99999,
    boxSizing: 'border-box',
    transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.15s, background-color 0.15s, box-shadow 0.15s',
  },
  customCursorDot: {
    position: 'fixed',
    width: '6px',
    height: '6px',
    backgroundColor: 'var(--text-bright)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 99999,
    boxSizing: 'border-box',
    transition: 'transform 0.1s ease, background-color 0.15s ease',
  },
};

