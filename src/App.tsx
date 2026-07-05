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
    'home.tsx',
    'profile.yaml',
    'README.md',
  ]);
  const [activeFile, setActiveFile] = useState<string>('home.tsx');

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
      <div className="main-layout">
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
    // Note: Do NOT animate top/left positions because that causes heavy layout repaints and laggy trail!
    // Transition size and border/glow properties instead
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
