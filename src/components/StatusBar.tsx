import React, { useState, useEffect } from 'react';
import { GitBranch, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StatusBarProps {
  activeFile: string;
}

const fileLanguageMap: { [key: string]: { label: string; color: string } } = {
  '.tsx': { label: 'TypeScript React', color: '#61afef' },
  '.ts': { label: 'TypeScript', color: '#61afef' },
  '.yaml': { label: 'YAML', color: '#e5c07b' },
  '.tf': { label: 'Terraform HCL', color: '#c678dd' },
  '.sh': { label: 'Shell Script', color: '#98c379' },
  '.md': { label: 'Markdown', color: '#98c379' },
  '.pdf': { label: 'PDF Document', color: '#e06c75' },
  'dockerfile': { label: 'Dockerfile', color: '#56b6c2' },
};

const getLanguage = (file: string) => {
  if (file.toLowerCase().includes('dockerfile')) return fileLanguageMap['dockerfile'];
  const ext = '.' + file.split('.').pop();
  return fileLanguageMap[ext] || { label: 'Plain Text', color: 'var(--text-dim)' };
};

export const StatusBar: React.FC<StatusBarProps> = ({ activeFile }) => {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const lang = getLanguage(activeFile);
  const timeStr = clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={styles.bar} className="no-select">
      {/* Left Section */}
      <div style={styles.section} className="statusbar-section-left">
        <div style={styles.item} className="statusbar-item-branch">
          <GitBranch size={12} style={{ marginRight: '4px' }} />
          <span>main</span>
        </div>

        <div style={styles.divider} className="statusbar-divider" />

        <div style={{ ...styles.item, color: 'var(--success)' }} className="statusbar-item-errors">
          <CheckCircle2 size={12} style={{ marginRight: '4px' }} />
          <span>0 errors</span>
        </div>

        <div style={{ ...styles.item, color: 'var(--text-dim)' }} className="statusbar-item-warnings">
          <AlertCircle size={12} style={{ marginRight: '4px' }} />
          <span>0 warnings</span>
        </div>

        <div style={styles.divider} className="statusbar-divider" />

        <div style={{ ...styles.item, color: 'var(--accent)' }} className="statusbar-item-mcp" title="Active Model Context Protocol servers">
          <span style={styles.pulseDot} />
          <span style={{ fontWeight: 600 }}>MCP: 3 Active</span>
        </div>
      </div>

      {/* Right Section */}
      <div style={styles.section} className="statusbar-section-right">
        <div style={styles.item} className="statusbar-item-lncol">
          <span style={{ color: 'var(--text-dim)' }}>Ln 1, Col 1</span>
        </div>

        <div style={styles.divider} className="statusbar-divider" />

        <div style={styles.item} className="statusbar-item-spaces">
          <span style={{ color: 'var(--text-dim)' }}>Spaces: 2</span>
        </div>

        <div style={styles.divider} className="statusbar-divider" />

        <div style={styles.item} className="statusbar-item-encoding">
          <span style={{ color: 'var(--text-dim)' }}>UTF-8</span>
        </div>

        <div style={styles.divider} className="statusbar-divider" />

        <div style={styles.item} className="statusbar-item-lang">
          <span style={{
            backgroundColor: `${lang.color}18`,
            color: lang.color,
            padding: '1px 8px',
            borderRadius: '3px',
            fontSize: '10px',
            fontWeight: 600,
          }}>
            {lang.label}
          </span>
        </div>

        <div style={styles.divider} className="statusbar-divider" />

        <div style={styles.item} className="statusbar-item-clock">
          <span style={{ color: 'var(--text-dim)' }}>{timeStr}</span>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  bar: {
    height: '24px',
    backgroundColor: 'var(--bg-titlebar)',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
    fontSize: '11px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text)',
    flexShrink: 0,
    zIndex: 40,
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    whiteSpace: 'nowrap',
  },
  divider: {
    width: '1px',
    height: '12px',
    backgroundColor: 'var(--border)',
  },
  pulseDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--success)',
    boxShadow: '0 0 0 0 var(--accent-dim)',
    animation: 'pulseSuccess 2s infinite ease-in-out',
    display: 'inline-block',
  },
};
