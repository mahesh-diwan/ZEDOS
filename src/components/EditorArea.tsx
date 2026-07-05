import React, { useState } from 'react';
import { X, Play, Code, ChevronRight, FileText } from 'lucide-react';
import { CodeView } from './views/CodeView';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProjectsView } from './views/ProjectsView';
import { SkillsView } from './views/SkillsView';
import { ExperienceView } from './views/ExperienceView';
import { ContactView } from './views/ContactView';
import { ReadmeView } from './views/ReadmeView';
import { BlogView } from './views/BlogView';
import { fileRawContents } from '../fileContents';

interface EditorAreaProps {
  activeFile: string;
  setActiveFile: (fileName: string) => void;
  openFiles: string[];
  closeFile: (fileName: string) => void;
  onToast: (icon: string, msg: string) => void;
}

export const EditorArea: React.FC<EditorAreaProps> = ({
  activeFile,
  setActiveFile,
  openFiles,
  closeFile,
  onToast,
}) => {
  // Mode: 'preview' (renders formatted page) vs 'code' (renders syntax highlighted source code)
  // Mode: 'preview' (renders formatted page) vs 'code' (renders syntax highlighted source code)
  const [viewMode, setViewMode] = useState<{ [key: string]: 'preview' | 'code' }>({
    'home.tsx': 'preview',
    'profile.yaml': 'preview',
    'projects.tf': 'preview',
    'skills.sh': 'preview',
    'experience.dockerfile': 'preview',
    'contact.yaml': 'preview',
    'blog.md': 'preview',
    'README.md': 'preview',
  });

  const getActiveViewMode = () => {
    return viewMode[activeFile] || 'preview';
  };

  const toggleViewMode = (mode: 'preview' | 'code') => {
    setViewMode((prev) => ({
      ...prev,
      [activeFile]: mode,
    }));
  };

  const renderActiveView = () => {
    const mode = getActiveViewMode();

    if (mode === 'code') {
      const codeString = fileRawContents[activeFile as keyof typeof fileRawContents] || '';
      return <CodeView fileName={activeFile} code={codeString} />;
    }

    if (activeFile === 'Mahesh_Diwan_Resume.pdf') {
      return (
        <div style={styles.pdfContainer} className="view-container animate-fade-in">
          <div style={styles.pdfHeader}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-bright)' }}>Mahesh_Diwan_Resume.pdf</span>
            <a 
              href="/Mahesh_Diwan_Resume.pdf" 
              download="Mahesh_Diwan_Resume.pdf"
              style={styles.pdfDownloadBtn}
            >
              Download PDF ↓
            </a>
          </div>
          <div style={styles.pdfFrameContainer} className="pdf-iframe-wrapper">
            <iframe 
              src="/Mahesh_Diwan_Resume.pdf#toolbar=0&navpanes=0&view=FitH" 
              width="100%" 
              height="100%" 
              style={{ border: 'none', background: 'var(--bg-terminal)' }} 
              title="Mahesh Diwan Resume"
              className="pdf-iframe"
            />
            <div className="pdf-mobile-fallback" style={styles.pdfMobileFallback}>
              <FileText size={48} style={{ color: 'var(--accent)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '8px' }}>Mahesh_Diwan_Resume.pdf</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-dim)', textAlign: 'center', maxWidth: '300px', marginBottom: '24px', lineHeight: '1.5' }}>
                Direct PDF rendering is limited on mobile web. You can download the PDF to view it on your device.
              </p>
              <a 
                href="/Mahesh_Diwan_Resume.pdf" 
                download="Mahesh_Diwan_Resume.pdf"
                style={styles.mobileDownloadBtn}
              >
                Download Resume PDF
              </a>
            </div>
          </div>
        </div>
      );
    }

    switch (activeFile) {
      case 'home.tsx':
        return <HomeView onNavigate={setActiveFile} />;
      case 'profile.yaml':
        return <AboutView />;
      case 'projects.tf':
        return <ProjectsView />;
      case 'skills.sh':
        return <SkillsView />;
      case 'experience.dockerfile':
        return <ExperienceView />;
      case 'contact.yaml':
        return <ContactView onToast={onToast} />;
      case 'blog.md':
        return <BlogView />;
      case 'README.md':
        return <ReadmeView />;
      default:
        return <HomeView onNavigate={setActiveFile} />;
    }
  };

  const getBreadcrumbs = () => {
    const root = 'mahesh-portfolio';
    if (activeFile.endsWith('.pdf')) {
      return [root, activeFile];
    }
    const extension = activeFile.split('.').pop() || '';
    let folder = 'src';
    if (extension === 'yaml' || extension === 'yml') folder = 'config';
    if (extension === 'tf') folder = 'terraform';
    if (extension === 'sh') folder = 'scripts';
    if (extension === 'dockerfile') folder = 'docker';
    if (extension === 'md') return [root, activeFile];
    return [root, folder, activeFile];
  };

  return (
    <div style={styles.editorArea}>
      {/* 1. Tab Bar */}
      <div style={styles.tabBar} className="no-select editor-tabbar">
        {openFiles.map((file) => {
          const isActive = file === activeFile;
          return (
            <div
              key={file}
              className={`editor-tab ${isActive ? 'active' : ''}`}
              style={{
                ...styles.tab,
                backgroundColor: isActive ? 'var(--bg-active-tab)' : 'var(--bg-inactive-tab)',
                color: isActive ? 'var(--text-bright)' : 'var(--text-dim)',
                borderBottom: isActive ? '1px solid transparent' : '1px solid var(--border)',
                borderRight: '1px solid var(--border)',
              }}
              onClick={() => setActiveFile(file)}
            >
              <span style={styles.tabText}>{file}</span>
              <button
                style={styles.tabClose}
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(file);
                }}
              >
                <X size={10} />
              </button>
            </div>
          );
        })}
        {/* Fill remaining empty space in tab bar */}
        <div style={styles.tabBarFill} />
      </div>

      {/* 2. Breadcrumbs and Code/Preview toggle pane */}
      <div style={styles.paneHeader} className="no-select editor-pane-header">
        {/* Breadcrumb path */}
        <div style={styles.breadcrumb} className="editor-breadcrumbs">
          {getBreadcrumbs().map((seg, idx, arr) => (
            <React.Fragment key={idx}>
              <span style={{ color: idx === arr.length - 1 ? 'var(--text-bright)' : 'var(--text-dim)' }}>
                {seg}
              </span>
              {idx < arr.length - 1 && <ChevronRight size={12} style={styles.crumbArrow} />}
            </React.Fragment>
          ))}
        </div>

        {/* Code / Preview Toggle (Only for valid code tabs) */}
        {activeFile !== 'Mahesh_Diwan_Resume.pdf' && (
          <div style={styles.toggleContainer} className="editor-toggle-container">
            <button
              style={{
                ...styles.toggleBtn,
                backgroundColor: getActiveViewMode() === 'preview' ? 'var(--bg-active-tab)' : 'transparent',
                color: getActiveViewMode() === 'preview' ? 'var(--text-bright)' : 'var(--text-dim)',
              }}
              onClick={() => toggleViewMode('preview')}
            >
              <Play size={11} style={{ marginRight: '4px' }} />
              <span>Preview</span>
            </button>
            <button
              style={{
                ...styles.toggleBtn,
                backgroundColor: getActiveViewMode() === 'code' ? 'var(--bg-active-tab)' : 'transparent',
                color: getActiveViewMode() === 'code' ? 'var(--text-bright)' : 'var(--text-dim)',
              }}
              onClick={() => toggleViewMode('code')}
            >
              <Code size={11} style={{ marginRight: '4px' }} />
              <span>Code</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. View Window Content */}
      <div style={styles.viewViewport}>
        {renderActiveView()}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  editorArea: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    minWidth: 0,
    backgroundColor: 'var(--bg)',
    overflow: 'hidden',
  },
  tabBar: {
    height: '35px',
    backgroundColor: 'var(--bg-inactive-tab)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },
  tab: {
    padding: '0 12px 0 16px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.1s, color 0.1s',
    minWidth: '100px',
    maxWidth: '180px',
    flexShrink: 0,
  },
  tabText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tabClose: {
    background: 'transparent',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    opacity: 0.5,
    padding: '2px',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarFill: {
    flex: 1,
    borderBottom: '1px solid var(--border)',
    backgroundColor: 'var(--bg-inactive-tab)',
  },
  paneHeader: {
    height: '30px',
    backgroundColor: 'var(--bg)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '11px',
    color: 'var(--text-dim)',
  },
  crumbArrow: {
    margin: '0 4px',
    color: 'var(--border)',
  },
  toggleContainer: {
    display: 'flex',
    backgroundColor: 'var(--bg-terminal)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '2px',
  },
  toggleBtn: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '3px',
    fontSize: '10px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'color 0.1s, background-color 0.1s',
  },
  viewViewport: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  pdfContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  pdfHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: 'var(--bg-sidebar)',
    borderBottom: '1px solid var(--border)',
    flexShrink: 0,
  },
  pdfDownloadBtn: {
    textDecoration: 'none',
    backgroundColor: 'var(--accent)',
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '11px',
    boxShadow: '0 2px 8px rgba(167, 139, 250, 0.2)',
    transition: 'opacity 0.2s',
  },
  pdfFrameContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  pdfMobileFallback: {
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: '32px 16px',
    height: '100%',
    boxSizing: 'border-box',
  },
  mobileDownloadBtn: {
    textDecoration: 'none',
    backgroundColor: 'var(--accent)',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    fontWeight: 600,
    fontSize: '13px',
    boxShadow: '0 4px 15px var(--accent-dim)',
    transition: 'opacity 0.2s',
  },
};
