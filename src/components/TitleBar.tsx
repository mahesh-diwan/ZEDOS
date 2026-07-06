import React, { useState } from 'react';
import { GitBranch, MessageSquare, Terminal, Folder, Share2, Search, Palette, Download } from 'lucide-react';

interface TitleBarProps {
  activeFile: string;
  projectPanelOpen: boolean;
  setProjectPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  assistantOpen: boolean;
  setAssistantOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  onOpenCmdPalette: (category?: 'all' | 'theme') => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  activeFile,
  projectPanelOpen,
  setProjectPanelOpen,
  terminalOpen,
  setTerminalOpen,
  assistantOpen,
  setAssistantOpen,
  onOpenCmdPalette,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <header
      style={styles.titleBar}
      className="no-select glass-surface"
      role="banner"
    >
      {/* 1. Window Controls (macOS dots) */}
      <div style={styles.windowControls}>
        <div style={{ ...styles.dot, backgroundColor: '#ff5f56' }} />
        <div style={{ ...styles.dot, backgroundColor: '#ffbd2e' }} />
        <div style={{ ...styles.dot, backgroundColor: '#27c93f' }} />
      </div>

      {/* 2. Left Breadcrumbs */}
      <div style={styles.leftBreadcrumb} className="titlebar-breadcrumbs">
        <Folder size={12} style={{ color: 'var(--text-dim)' }} />
        <span style={styles.projectName}>zedos</span>
        <span style={styles.separator}>/</span>
        <span style={styles.fileName}>{activeFile}</span>
      </div>

      {/* 3. Center Search / Command Palette trigger */}
      <div style={styles.searchBar} className="titlebar-search" onClick={() => onOpenCmdPalette('all')}>
        <Search size={12} style={{ color: 'var(--text-dim)' }} />
        <span style={styles.searchPlaceholder}>
          maheshdiwan.com — <GitBranch size={10} style={{ verticalAlign: 'middle', marginRight: '3px' }} /> main
        </span>
        <span style={styles.shortcutHint}>Ctrl+P</span>
      </div>

      {/* 4. Right Toolbar */}
      <div style={styles.rightToolbar}>
        {/* Resume CTA — uses shared .btn-primary */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }} className="titlebar-collab">
          <a
            href="./Mahesh_Diwan_Resume.pdf"
            download="Mahesh_Diwan_Resume.pdf"
            className="btn-primary"
            style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '5px', letterSpacing: '0.03em' }}
            title="Download Resume PDF"
          >
            <Download size={11} />
            RESUME
          </a>
        </div>

        {/* Collaboration Area */}
        <div style={styles.collabGroup} className="titlebar-collab">
          <div style={styles.avatarWrapper} title="Mahesh Diwan (Online - Host)">
            <div style={{ ...styles.avatar, backgroundColor: '#c678dd' }}>MD</div>
            <div style={styles.statusIndicator} />
          </div>
          <div style={styles.avatarWrapper} title="You (Guest)">
            <div style={{ ...styles.avatar, backgroundColor: '#61afef' }}>G</div>
          </div>
          <button
            style={{ ...styles.shareBtn, color: copiedShare ? 'var(--success)' : 'var(--text)' }}
            onClick={handleShare}
            title="Copy share link"
          >
            <Share2 size={13} />
            <span style={styles.shareText} className="titlebar-share-text">
              {copiedShare ? 'Copied!' : 'Share'}
            </span>
          </button>
        </div>

        <div style={styles.divider} className="titlebar-divider" />

        {/* Layout controls */}
        <div style={styles.layoutControls}>
          <button
            style={{ ...styles.toolBtn, color: 'var(--accent)' }}
            onClick={() => onOpenCmdPalette('theme')}
            title="Switch Theme (Ctrl+P)"
          >
            <Palette size={14} />
          </button>
          <button
            style={{ ...styles.toolBtn, opacity: projectPanelOpen ? 1 : 0.4 }}
            onClick={() => setProjectPanelOpen(!projectPanelOpen)}
            title="Toggle File Explorer (Ctrl+B)"
          >
            <Folder size={14} />
          </button>
          <button
            style={{ ...styles.toolBtn, opacity: terminalOpen ? 1 : 0.4 }}
            onClick={() => setTerminalOpen(!terminalOpen)}
            title="Toggle Terminal (Ctrl+`)"
          >
            <Terminal size={14} />
          </button>
          <button
            style={{ ...styles.toolBtn, opacity: assistantOpen ? 1 : 0.4, color: assistantOpen ? 'var(--accent)' : undefined }}
            onClick={() => setAssistantOpen(!assistantOpen)}
            title="Toggle AI Assistant (Ctrl+Shift+C)"
          >
            <MessageSquare size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  titleBar: {
    height: '38px',
    /* glass-surface class handles backdrop-filter, bg, border, shadow */
    borderBottom: '1px solid var(--glass-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    fontSize: '12px',
    color: 'var(--text)',
    zIndex: 40,
    flexShrink: 0,
  },
  windowControls: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    width: '60px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  leftBreadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: 'var(--text-dim)',
    fontSize: '11.5px',
  },
  projectName: {
    fontWeight: 500,
    color: 'var(--text)',
  },
  separator: {
    color: 'var(--border)',
  },
  fileName: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--text-bright)',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(0,0,0,0.15)',
    backdropFilter: 'blur(8px)',
    border: '1px solid var(--glass-border)',
    borderRadius: '6px',
    height: '24px',
    width: '280px',
    padding: '0 8px',
    cursor: 'pointer',
    justifyContent: 'space-between',
    transition: 'border-color 0.2s',
  },
  searchPlaceholder: {
    color: 'var(--text-dim)',
    fontSize: '11.5px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    flex: 1,
    textAlign: 'center',
  },
  shortcutHint: {
    fontSize: '9px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'var(--text-dim)',
    padding: '1px 4px',
    borderRadius: '3px',
    border: '1px solid var(--glass-border)',
    whiteSpace: 'nowrap',
  },
  rightToolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  collabGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    fontWeight: 700,
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.15)',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: '-1px',
    right: '-1px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#27c93f',
    border: '1.5px solid var(--bg-titlebar)',
  },
  shareBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '11px',
    transition: 'background-color 0.1s',
  },
  shareText: {
    fontSize: '11px',
    fontWeight: 500,
  },
  divider: {
    width: '1px',
    height: '16px',
    backgroundColor: 'var(--glass-border)',
  },
  layoutControls: {
    display: 'flex',
    gap: '2px',
  },
  toolBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-bright)',
    cursor: 'pointer',
    width: '26px',
    height: '26px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.1s, opacity 0.1s, color 0.15s',
  },
};
